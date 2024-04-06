import {
  AfterViewInit,
  Component,
  OnChanges,
  OnInit,
  SimpleChanges,
  ViewEncapsulation,
} from '@angular/core';
import { TextService } from '../../services/text-service/text.service';
import Keyboard from 'simple-keyboard';

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
  constructor(private textService: TextService) {}
  ngOnChanges(changes: SimpleChanges): void {
    throw new Error('Method not implemented.');
  }
  value = '';
  keyboard!: Keyboard;

  ngOnInit(): void {
    const path = '../../../assets/text.txt'; // Aquí debes proporcionar la ruta correcta al archivo de texto
    const wordCount = 20; // Número de palabras que deseas en el párrafo
    this.textService.getParagraph(path, wordCount);
    this.textService.text$.subscribe((text: string) => {
      this.paragraph = text;
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

  onKeyPress = (button: string) => {
    const localResource = this.transform(this.paragraph, this.current, button);
    button = button == '{space}' ? ' ' : button;
    if (localResource.currentChart === button) {
      this.current++;
    }
    this.resource = localResource;
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
