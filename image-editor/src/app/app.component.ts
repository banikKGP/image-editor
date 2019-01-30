import { Component } from '@angular/core';
import { BsModalService } from 'ngx-bootstrap';
import { ExampleImageEditorComponent } from 'example-image-editor';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})


export class AppComponent {
  title = 'image-editor';
  
  constructor(private modalService: BsModalService){
    let initialState = {
      url: '../assets/Quotefancy-492-3840x2160.jpg'
    }
    this.modalService.show(ExampleImageEditorComponent, { class: 'modal-xl', initialState, 'keyboard': false })
  }
  
}
