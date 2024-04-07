import { Component } from '@angular/core';
export const FILE_PATH = '../../../assets/text.txt';
export const WORDS_LENGTH = 20;
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'talent-front';
}
