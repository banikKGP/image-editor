import { NgModule } from '@angular/core';
import { ExampleImageEditorComponent } from './example-image-editor.component';
import { Ng5SliderModule } from 'ng5-slider';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@NgModule({
  declarations: [ExampleImageEditorComponent],
  imports: [
    Ng5SliderModule,
    FormsModule,
    CommonModule
  ],
  exports: [ExampleImageEditorComponent]
})
export class ExampleImageEditorModule { }
