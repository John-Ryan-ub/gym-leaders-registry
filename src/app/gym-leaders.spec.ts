import { TestBed } from '@angular/core/testing';
import { GymLeaders } from './gym-leaders';

describe('GymLeaders', () => {
  let service: GymLeaders;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GymLeaders);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
