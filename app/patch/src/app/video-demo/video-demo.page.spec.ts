import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VideoDemoPage } from './video-demo.page';

describe('VideoDemoPage', () => {
  let component: VideoDemoPage;
  let fixture: ComponentFixture<VideoDemoPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VideoDemoPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VideoDemoPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
