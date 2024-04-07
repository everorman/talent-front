import { Component, OnInit } from '@angular/core';
import { LocalStorageService } from '../../services/local-storage/local-storage.service';
import { TextService } from '../../services/text-service/text.service';
import { FILE_PATH, WORDS_LENGTH } from '../../app.component';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.scss'],
})
export class NavBarComponent implements OnInit {
  constructor(
    private localStorage: LocalStorageService,
    private textService: TextService
  ) {}

  ngOnInit() {}
  restartSession() {
    this.localStorage.clear();
    const path = FILE_PATH;
    const wordCount = WORDS_LENGTH;
    this.textService.getParagraph(path, wordCount);
  }
}
