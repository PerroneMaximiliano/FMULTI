import { TestBed } from '@angular/core/testing';

import { AudiosService } from './audios.service';

describe('AudiosService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: AudiosService = TestBed.get(AudiosService);
    expect(service).toBeTruthy();
  });
});
