import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ExampleImageEditorModule, ExampleImageEditorComponent } from 'example-image-editor';
import { ModalModule } from 'ngx-bootstrap';


@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    ModalModule.forRoot(),
    BrowserModule,
    AppRoutingModule,
    ExampleImageEditorModule
  ],
  providers: [],
  bootstrap: [AppComponent],
  entryComponents: [
    ExampleImageEditorComponent
  ]
})
export class AppModule { }
