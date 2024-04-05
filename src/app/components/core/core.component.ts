import { Component, OnInit } from '@angular/core';
import { TextService } from '../../services/text-service/text.service';

export type ResourceType = {
  correct: string;
  currentChart: string;
  pending: string;
};
@Component({
  selector: 'app-core',
  templateUrl: './core.component.html',
  styleUrls: ['./core.component.scss'],
})
export class CoreComponent implements OnInit {
  paragraph: string = '';
  currentCharacter = 'a';
  current: number = 5;
  resource!: ResourceType;
  constructor(private textService: TextService) {}

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
    console.log(value, current, key);
    current = current - 1;
    const words = value.split('');
    console.log(words, current);
    const currentChart = words[current];
    const pending = words.splice(current + 1, words.length).join('');
    const correct = words.splice(0, current).join('');
    return { correct, pending, currentChart };
  }
}
