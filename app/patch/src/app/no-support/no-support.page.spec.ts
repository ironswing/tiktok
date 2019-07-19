import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NoSupportPage } from './no-support.page';

describe('NoSupportPage', () => {
  let component: NoSupportPage;
  let fixture: ComponentFixture<NoSupportPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NoSupportPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NoSupportPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
