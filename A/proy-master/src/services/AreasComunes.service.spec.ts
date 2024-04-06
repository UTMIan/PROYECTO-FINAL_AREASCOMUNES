
import { TestBed } from '@angular/core/testing';

import { AreasComunesService } from './AreasComunes.service';

describe('AreasComunesService', () => {
  let service: AreasComunesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AreasComunesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});