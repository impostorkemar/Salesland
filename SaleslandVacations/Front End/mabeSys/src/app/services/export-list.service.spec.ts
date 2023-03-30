import { TestBed } from '@angular/core/testing';

import { ExportListService } from './export-list.service';

describe('ExportListService', () => {
  let service: ExportListService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ExportListService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
