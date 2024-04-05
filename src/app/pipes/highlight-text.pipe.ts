import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'highlightText',
})
export class HighlightTextPipe implements PipeTransform {
  transform(value: string, current: number = 0, key?: string): any {
    console.log(value, current, key);
    current = current - 1;
    const words = value.split('');
    console.log(words, current);
    const currentChar = words[current];
    const pending = words.splice(current + 1, words.length).join('');
    const correct = words.splice(0, current - 1).join('');
    return { correct, pending, currentChar };
  }
}
