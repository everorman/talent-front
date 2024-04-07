import {
  AfterViewInit,
  Component,
  OnChanges,
  OnInit,
  SimpleChanges,
  ViewEncapsulation,
} from '@angular/core';
import Keyboard from 'simple-keyboard';
import { LocalStorageService } from '../../services/local-storage/local-storage.service';
import { TextService } from '../../services/text-service/text.service';
import { FILE_PATH, WORDS_LENGTH } from '../../app.component';

export type ResourceType = {
  correct: string;
  currentChart: string;
  pending: string;
  invalid: string;
};
@Component({
  selector: 'app-core',
  templateUrl: './core.component.html',
  styleUrls: ['./core.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class CoreComponent implements OnInit, AfterViewInit, OnChanges {
  paragraph: string = '';
  current: number = 0;
  resource!: ResourceType;
  value = '';
  keyboard!: Keyboard;

  constructor(
    private textService: TextService,
    private localStorage: LocalStorageService
  ) {}

  ngOnChanges(changes: SimpleChanges): void {
    throw new Error('Method not implemented.');
  }

  ngOnInit(): void {
    const path = FILE_PATH;
    const wordCount = WORDS_LENGTH;

    const resourceSaved = this.localStorage.getItem('session');
    const paragraphSaved = this.localStorage.getItem('paragraph');
    const currentSaved = this.localStorage.getItem('current');
    if (resourceSaved && paragraphSaved && currentSaved) {
      this.resource = JSON.parse(resourceSaved);
      this.paragraph = paragraphSaved;
      this.current = parseInt(currentSaved);
    } else {
      this.textService.getParagraph(path, wordCount);
    }
    this.textService.text$.subscribe((text: string) => {
      if (!text) return;
      this.paragraph = text;
      this.localStorage.setItem('paragraph', this.paragraph);
      this.current = 0;
      this.resource = this.transform(text, this.current);
    });
  }

  private transform(
    value: string,
    current: number = 0,
    key?: string
  ): ResourceType {
    const words = value.split('');
    const currentChart = words[current];
    const pending = words.splice(current + 1, words.length).join('');
    const correct = words.splice(0, current).join('');
    const invalid = currentChart == key ? '' : currentChart;
    return { correct, pending, currentChart, invalid };
  }

  ngAfterViewInit() {
    this.keyboard = new Keyboard({
      onChange: (input) => this.onChanges(input),
      onKeyPress: (button) => this.onKeyPress(button),
      physicalKeyboardHighlight: true,
      physicalKeyboardHighlightPress: true,
    });
  }

  onChanges = (input: string) => {
    this.value = input;
  };

  onKeyPress = (event: string) => {
    console.log('onKeyPress', event);
    const button = event == '{space}' ? ' ' : event;
    const localResource = this.transform(this.paragraph, this.current, button);
    if (localResource.currentChart === button) {
      this.current++;
    }
    this.resource = localResource;
    this.localStorage.setItem('session', JSON.stringify(this.resource));
    this.localStorage.setItem('current', JSON.stringify(this.current));
    if (button === '{shift}' || button === '{lock}') this.handleShift();
  };

  onInputChange = (event: any) => {
    this.keyboard.setInput(event.target.value);
  };

  handleShift = () => {
    let currentLayout = this.keyboard.options.layoutName;
    let shiftToggle = currentLayout === 'default' ? 'shift' : 'default';

    this.keyboard.setOptions({
      layoutName: shiftToggle,
    });
  };
}
