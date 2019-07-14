import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UserPortocolPage } from './user-portocol.page';

describe('UserPortocolPage', () => {
  let component: UserPortocolPage;
  let fixture: ComponentFixture<UserPortocolPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UserPortocolPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserPortocolPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
