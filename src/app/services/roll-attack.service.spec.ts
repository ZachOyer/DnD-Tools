import { TestBed } from '@angular/core/testing';

import { RollAttackService } from './roll-attack.service';

describe('RollAttackService', () => {
  let service: RollAttackService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RollAttackService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
