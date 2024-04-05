import { Component, OnInit } from '@angular/core';
import { TextService } from '../../services/text-service/text.service';

@Component({
  selector: 'app-core',
  templateUrl: './core.component.html',
  styleUrls: ['./core.component.scss'],
})
export class CoreComponent implements OnInit {
  paragraph: string = '';
  constructor(private textService: TextService) {}

  ngOnInit(): void {
    const path = '../../../assets/text.txt'; // Aquí debes proporcionar la ruta correcta al archivo de texto
    const wordCount = 20; // Número de palabras que deseas en el párrafo
    this.textService.getParagraph(path, wordCount);
    this.textService.text$.subscribe((text: string) => {
      this.paragraph = text;
    });
  }
}
