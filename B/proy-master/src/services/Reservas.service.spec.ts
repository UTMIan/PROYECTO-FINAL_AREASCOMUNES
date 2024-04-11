
import { TestBed } from '@angular/core/testing';

import { ReservasService } from './Reservas.service';

describe('ReservasService', () => {
  let service: ReservasService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ReservasService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});