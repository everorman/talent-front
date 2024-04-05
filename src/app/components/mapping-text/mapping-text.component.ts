import {
  Component,
  Input,
  OnChanges,
  OnInit,
  SimpleChanges,
} from '@angular/core';
import { ResourceType } from '../core/core.component';

@Component({
  selector: 'app-mapping-text',
  templateUrl: './mapping-text.component.html',
  styleUrls: ['./mapping-text.component.css'],
})
export class MappingTextComponent implements OnInit, OnChanges {
  @Input() resource!: ResourceType;
  @Input() key = '';
  currentClass = '';
  constructor() {}

  ngOnInit() {}

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['resource']) {
      const newValue = changes?.['resource']?.currentValue;
      console.log('Nuevo valor del input:', newValue);
      this.currentClass =
        newValue.currentChar == this.key ? 'correct' : 'invalid';
    }
  }
}
