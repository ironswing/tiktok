import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditBackgoundPage } from './edit-backgound.page';

describe('EditBackgoundPage', () => {
  let component: EditBackgoundPage;
  let fixture: ComponentFixture<EditBackgoundPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditBackgoundPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditBackgoundPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
