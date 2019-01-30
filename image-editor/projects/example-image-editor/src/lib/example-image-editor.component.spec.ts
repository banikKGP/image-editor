import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ExampleImageEditorComponent } from './example-image-editor.component';

describe('ExampleImageEditorComponent', () => {
  let component: ExampleImageEditorComponent;
  let fixture: ComponentFixture<ExampleImageEditorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ExampleImageEditorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ExampleImageEditorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
