import { TestBed } from '@angular/core/testing';

import { OlympicService } from './olympic';

describe('Olympic', () => {
  let service: OlympicService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(OlympicService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
