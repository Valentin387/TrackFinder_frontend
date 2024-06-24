import { TestBed } from '@angular/core/testing';

import { GeneralUseService } from './general-use.service';

describe('GeneralUseService', () => {
  let service: GeneralUseService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GeneralUseService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
