import { TestBed, async, inject } from '@angular/core/testing';

import { AnHttpGuard } from './an-http.guard';

describe('AnHttpGuard', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AnHttpGuard]
    });
  });

  it('should ...', inject([AnHttpGuard], (guard: AnHttpGuard) => {
    expect(guard).toBeTruthy();
  }));
});
