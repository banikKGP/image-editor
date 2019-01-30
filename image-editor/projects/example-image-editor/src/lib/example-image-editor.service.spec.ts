import { TestBed } from '@angular/core/testing';

import { ExampleImageEditorService } from './example-image-editor.service';

describe('ExampleImageEditorService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ExampleImageEditorService = TestBed.get(ExampleImageEditorService);
    expect(service).toBeTruthy();
  });
});
