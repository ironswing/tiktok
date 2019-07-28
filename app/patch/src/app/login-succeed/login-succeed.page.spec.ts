import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LoginSucceedPage } from './login-succeed.page';

describe('LoginSucceedPage', () => {
  let component: LoginSucceedPage;
  let fixture: ComponentFixture<LoginSucceedPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LoginSucceedPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginSucceedPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
