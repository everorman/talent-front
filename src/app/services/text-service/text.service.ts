import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, map } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class TextService {
  private textSubject: BehaviorSubject<string> = new BehaviorSubject<string>(
    ''
  );
  public text$: Observable<string> = this.textSubject.asObservable();

  constructor(private http: HttpClient) {}

  getParagraph(path: string, wordCount: number): void {
    this.http
      .get(path, { responseType: 'text' })
      .pipe(map((text: string) => this.extractParagraph(text, wordCount)))
      .subscribe((paragraph: string) => {
        this.textSubject.next(paragraph.toLowerCase());
      });
  }

  private extractParagraph(text: string, wordCount: number): string {
    const words = text.split(/\s+/); // Separar el texto en palabras
    let paragraph = '';
    if (words.length > wordCount) {
      const startIndex = this.generateRandomIndex(words.length - wordCount); // Índice de inicio aleatorio
      paragraph = words.slice(startIndex, startIndex + wordCount).join(' '); // Extraer N palabras continuas
    } else {
      paragraph = words.join(' '); // Si el texto tiene menos palabras que la cantidad deseada, devolver el texto completo
    }
    return paragraph;
  }

  private generateRandomIndex(max: number): number {
    return Math.floor(Math.random() * (max + 1));
  }
}
