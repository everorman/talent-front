/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { MappingTextComponent } from './mapping-text.component';

describe('MappingTextComponent', () => {
  let component: MappingTextComponent;
  let fixture: ComponentFixture<MappingTextComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MappingTextComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MappingTextComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
