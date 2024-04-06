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
  styleUrls: ['./mapping-text.component.scss'],
})
export class MappingTextComponent {
  @Input() resource!: ResourceType;
  currentClass = '';
  constructor() {}
}
