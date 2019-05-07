import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GoldenPage } from './golden.page';

describe('GoldenPage', () => {
  let component: GoldenPage;
  let fixture: ComponentFixture<GoldenPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GoldenPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GoldenPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
