/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { NoContactComponent } from './no-contact.component';

describe('NoContactComponent', () => {
  let component: NoContactComponent;
  let fixture: ComponentFixture<NoContactComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NoContactComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NoContactComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
