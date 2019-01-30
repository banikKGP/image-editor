import { Component, OnInit, NgZone, Inject, Input, ViewChildren, QueryList, ViewChild, ElementRef, Output, EventEmitter } from '@angular/core';
import { DOCUMENT } from '@angular/platform-browser';
import { Options } from 'ng5-slider';

declare var fabric: any
declare var $: any;

@Component({
  selector: 'enl-example-image-editor',
  templateUrl: './example-image-editor.component.html',
  styleUrls: ['./example-image-editor.component.css']
})

export class ExampleImageEditorComponent implements OnInit {

  title = 'imageviewer-app';
  canvas: any;
  ctx: any;
  currentImage: any = new Image();
  startDrawing: boolean;
  drawType: any;
  startPoint: any;
  unsavedLayers: any[];
  eventActivated: boolean;
  savedLayers: any[];
  currentPath: Path2D;
  currentPoint: any;
  dummyCanvas: any;
  dummyCtx: any;
  movedPoints: any[];
  input: HTMLInputElement;
  modalHeight: number;    /*'#78BFA3', '#F9D948', '#E58A3B', '#F66C6C', '#6C59C9', '#000000'*/
  modalWidth: any;
  displayToolbar: string;
  url: string;
  fileExt: string;
  fullScreenClass: string;
  isImageLoaded: boolean = false;
  colorCodes = [
    {
      colorCode: '#6DA6E8',
      colorName: 'Blue',
      status: false
    },
    {
      colorCode: '#78BFA3',
      colorName: 'Green',
      status: false
    },
    {
      colorCode: '#F9D948',
      colorName: 'Yellow',
      status: false
    },
    {
      colorCode: '#E58A3B',
      colorName: 'Orange',
      status: false
    },
    {
      colorCode: '#6C59C9',
      colorName: 'Purple',
      status: false
    },
    {
      colorCode: '#F66C6C',
      colorName: 'Red',
      status: false
    },
    {
      colorCode: '#000000',
      colorName: 'Black',
      status: false
    }
  ]

  // dragger options
  colorPicker: boolean;
  colorPickerDisplay: string;
  curColor: any = this.colorCodes[1];
  value: number = 5;

  options: Options;
  loadedImageCount: number = 0;
  isFullScreen: boolean = false;
  img: any;
  isDrawHandlerActivated: boolean;
  curZoomLevel: any = 1;

  constructor(private ngZone: NgZone, @Inject(DOCUMENT) private document: any) {
    // window.onresize = (e) => {
    //   this.ngZone.run(() => {
    //     this.heightCalculation();
    //   })
    // }
    setTimeout(() => {
      // this.url = '../../../../src/assets/Quotefancy-492-3840x2160.jpg'
      this.heightCalculation();
      this.initializeCanvas();
    }, 200);

    setTimeout(() => {
      this.options = {
        floor: 1,
        ceil: 10,
        step: 1,
        showSelectionBar: true,
        // selectionBarGradient: {
        //   from: 'white',
        //   to: this.curColor.colorCode
        // }
        getSelectionBarColor: (value: number): string => {
          return this.curColor.colorCode;
        }
      }
    }, 5000)
  }

  @Input() currentImageUrl?: any;
  @Input() imageCollection: any;
  @Input() toolbarOption?: any;
  @Input() imageArray?: any;
  @ViewChildren('allTheseThings') things: QueryList<any>;
  @ViewChild('modalFooter') modalFooterView: ElementRef;
  @ViewChild('modalHeader') modalHeaderView: ElementRef;
  angleinDegrees: number;
  modalDisplay: boolean;
  display: string;
  origY: any;
  origX: any;
  draw: any;
  isMouseDown: boolean;
  @Output() close = new EventEmitter<any>();
  imgType: string;
  removeImageEmitter: EventEmitter<any>;

  ngOnInit() {
  }

  ngAfterContentInit() {

  }

  ngOnChanges() {
    const scope = this;
    this.modalDisplay = true;
    this.display = 'block';
    this.savedLayers = [];
    this.movedPoints = [];
    this.drawType = '';
    this.angleinDegrees = 0;
    // this.currentImage.src = this.currentImageUrl;
    // this.currentImage.src = '../../assets/image1.jpg';
    // this.currentImage.onload = () => {
    //     scope.redrawSavedCanvas();
    // };

  }

  ngAfterViewInit() {
    $('.modal').addClass('document-tagging in');
    this.options = {
      floor: 1,
      ceil: 10,
      step: 1,
      showSelectionBar: true,
      getSelectionBarColor: (value: number): string => {
        return this.curColor.colorCode;
      }
    }

  }

  heightCalculation() {
    var winHeight = $(window).height();
    var modalHeader = this.modalHeaderView.nativeElement.offsetHeight;
    // var modalHeader = $(this).find('.modal-header').innerHeight();
    var modalFooter = this.modalFooterView.nativeElement.offsetHeight;
    var modalTotaldeduct = (modalHeader + modalFooter + 44);
    this.modalHeight = (winHeight - modalTotaldeduct);
    this.modalWidth = this.modalHeaderView.nativeElement.offsetWidth;
  }

  // initializeCanvas(){}
  initializeCanvas() {
    this.isImageLoaded = true;
    this.curColor = this.colorCodes[1];
    this.curColor.status = true;
    this.toolbarOption = true;
    const scope = this;
    this.savedLayers = [];
    this.movedPoints = [];
    this.angleinDegrees = 0;
    fabric.Image.fromURL(this.url, (img) => {
      this.canvas = new fabric.Canvas('myCanvas', { 'selection': false, 'height': img.height, 'width': img.width });
      this.ctx = this.canvas.getContext('2d');
      this.imgType = img.height >= img.width ? 'potrait' : 'landscape'
      this.img = img;
      img.set({
        'hasControls': false,
        'evented': true,
        'selectable': true,
        'lockScalingFlip': false
      });

      this.canvas.add(img);
      this.canvas.setZoom(this.curZoomLevel);
      this.canvas.centerObject(img);
      this.canvas.sendBackwards(img);
      this.isImageLoaded = true;
      this.canvas.on('mouse:down', (e) => { this.onMouseDownEvent(e); });
      this.canvas.on('mouse:move', (e) => { this.onMouseMoveEvent(e); });
      this.canvas.on('mouse:up', () => { this.onMouseUpEvent(); });
      this.canvas.on('mouse:wheel', (opt) => {
        var delta = opt.e.deltaY;
        var pointer = this.canvas.getPointer(opt.e);
        var zoom = this.canvas.getZoom();
        zoom = zoom + delta / 200;
        if (zoom > 20) zoom = 20;
        if (zoom < 0.1) zoom = 0.1;
        this.canvas.zoomToPoint({ x: opt.e.offsetX, y: opt.e.offsetY }, zoom);
        opt.e.preventDefault();
        opt.e.stopPropagation();
      });
      var canvasWrapper = document.getElementById('canvasWrapper');
      canvasWrapper.tabIndex = 1000;
      canvasWrapper.addEventListener("keydown", (e) => {
        if (e.keyCode == 46) {
          if (this.canvas.getActiveObject()) {
            this.canvas.remove(this.canvas.getActiveObject())
          }
          // this.canvas.getActiveObject().remove();
        }
        else if (e.keyCode == 27) {
          this.groupObjects();
          this.canvas.getObjects()[0].selectable = true; //while drawing to hold the canvas fix
          this.canvas.getObjects()[0].evented = true;
        }
      }, false);
    }, { crossOrigin: 'anonymous' });
  }

  addText() {
    this.draw = new fabric.IText('tap and type', {
      left: 50,
      top: 100,
      fontFamily: 'arial black',
      fill: this.curColor.colorCode,
      fontSize: this.value * 5,
      selectable: true,
    })
    this.draw.selectionStart = 0;
    this.draw.selectionEnd = 9
    this.canvas.add(this.draw);
  }

  activateHandler(type) {
    // this.groupObjects();
    this.isDrawHandlerActivated = true;
    this.canvas.isDrawingMode = false;
    this.drawType = type;
    this.isMouseDown = true;
    this.canvas.getObjects()[0].selectable = false; //while drawing to hold the canvas fix
    this.canvas.getObjects()[0].evented = false; //while drawing to hold the canvas fix
  }

  groupObjects() {
    let curZoom = this.canvas.getZoom();
    var group = new fabric.Group(this.canvas.getObjects());
    this.canvas.clear();
    group.hasControls = false;
    this.canvas.add(group);
    this.canvas.setZoom(curZoom);
    // this.canvas.centerObject(group);
  }

  onMouseDownEvent(o) {
    if (this.isMouseDown) {
      // if(this.draw) this.draw.selectable = false
      var pointer = this.canvas.getPointer(o.e);
      this.origX = pointer.x;
      this.origY = pointer.y;
      var pointer = this.canvas.getPointer(o.e);
      var options = {
        left: this.origX,
        top: this.origY,
        originX: 'left',
        originY: 'top',
        angle: 0,
        stroke: this.curColor.colorCode,
        strokeWidth: this.value,
        fill: 'rgba(0,0,0,0)',
        transparentCorners: true,
        radius: 1,
        x1: this.origX,
        y1: this.origY,
        selectable: true,
        fontFamily: 'arial black',
        fontSize: this.value * 5,
      }
      this.dummyDrawPath(options);
      this.startDrawing = true;
    }
  }

  onMouseMoveEvent(o) {
    if (!this.startDrawing) return;
    var pointer = this.canvas.getPointer(o.e);

    if (this.origX > pointer.x) {
      this.draw.set({ left: Math.abs(pointer.x) });
    }
    if (this.origY > pointer.y) {
      this.draw.set({ top: Math.abs(pointer.y) });
    }

    this.draw.set({ width: Math.abs(this.origX - pointer.x) });
    this.draw.set({ height: Math.abs(this.origY - pointer.y) });
    this.draw.set({ radius: Math.abs(this.origX - pointer.x) / 2 });
    this.draw.set({ x2: pointer.x });
    this.draw.set({ y2: pointer.y });

    this.canvas.renderAll();
  }

  onMouseUpEvent() {
    this.canvas.isDrawingMode = false;
    this.isMouseDown = false //true for repeated annotation
    if (this.isDrawHandlerActivated) {
      this.startDrawing = false;
      this.isDrawHandlerActivated = false;
      this.draw.setCoords();
    }
    // this.groupObjects();
    // this.canvas.getObjects()[0].selectable = true; //while drawing to hold the canvas fix
    // this.canvas.getObjects()[0].evented = true; //while drawing to hold the canvas fix
  }

  dummyDrawPath(options) {

    if (this.drawType === 'line') {
      this.draw = new fabric.Line([this.origX, this.origY, this.origX, this.origY], options);
      this.canvas.add(this.draw);
    } else if (this.drawType === 'freehand') {
      this.drawFreehand();
    } else if (this.drawType === 'rectangle') {
      this.draw = new fabric.Rect(options);
      this.canvas.add(this.draw);
    } else if (this.drawType === 'ellipse') {
      this.draw = new fabric.Circle(options);
      this.canvas.add(this.draw);
    } else if (this.drawType === 'text') {
      this.draw = new fabric.IText('tap and type', {
        left: this.origX,
        top: this.origY,
        fontFamily: 'arial black',
        fill: this.curColor.colorCode,
        fontSize: this.value * 5,
        selectable: true,
      });
      this.canvas.add(this.draw);
    }
  }

  drawFreehand() {
    this.isMouseDown = false;
    this.canvas.isDrawingMode = 1;
    this.canvas.freeDrawingBrush.color = this.curColor.colorCode;
    this.canvas.freeDrawingBrush.width = 3;
    // fabric.Object.prototype.selectable = false;
    this.canvas.renderAll();
  }

  rotateImage() {
    this.angleinDegrees = (this.angleinDegrees + 90) % 360;
    let cHeight = this.canvas.height;
    let cWidth = this.canvas.width;
    var group = new fabric.Group(this.canvas.getObjects());
    group.rotate(this.angleinDegrees);
    group.hasControls = false;
    this.url = group.toDataURL();
    this.curZoomLevel = this.canvas.getZoom();
    this.canvas.dispose();
    this.initializeCanvas();
  }

  redrawCanvas() {
    fabric.Image.fromURL(this.url, (img) => {
      let dummycanvas = new fabric.Canvas('myCanvas', { 'selection': false, 'height': img.height, 'width': img.width });
      var group = new fabric.Group(this.canvas.getObjects());
      dummycanvas.add(group);
      dummycanvas.centerObject(group);
      this.closeModal(dummycanvas.toDataURL(this.fileExt));
    }, { crossOrigin: 'anonymous' });
  }

  toggleFullScreen() {
    this.isFullScreen = !this.isFullScreen;
    var canvasH = $('.canvas-container').height();
    var canvasW = $('.canvas-container').width();
    let elem: any = document.getElementById('imageViewer');
    if (this.isFullScreen) {
      elem.webkitRequestFullscreen();
      setTimeout(() => {
        $('.full-screen-view').find('.canvas-container').css({ 'margin-top': + 0 - canvasH / 2, 'margin-left': + 0 - canvasW / 2 });
      }, 100);

    }
    else {
      if (document.exitFullscreen) {
        document.exitFullscreen();
      } else if (document['mozCancelFullScreen']) { /* Firefox */
        document['mozCancelFullScreen'] = false;
      } else if (this.document.webkitCancelFullScreen) { /* Chrome, Safari and Opera */
        this.document.webkitCancelFullScreen();
      } else if (document['msExitFullscreen']) { /* IE/Edge */
        document['msExitFullscreen'] = false
      }
      setTimeout(() => {
        $('#imageViewer').find('.canvas-container').css({ 'margin-top': '', 'margin-left': '' });
      }, 100);
    }
  }

  undo() {
    this.savedLayers.pop();
  }

  saveImage() {
    const c = document.createElement('canvas');
    c.height = this.canvas.height;
    c.width = this.canvas.width;
    const ctx = c.getContext('2d');
    const img = this.currentImage;
    ctx.drawImage(img, 0, 0, img.width, img.height, 0, 0, c.width, c.height);
    for (let i = 0; i < this.savedLayers.length; i++) {
      ctx.stroke(this.savedLayers[i]);
    }
    c.toBlob((blob) => {
      const url = URL.createObjectURL(blob);
      window.open(url);
    });
  }

  closeModal(dataurl = null) {
    this.close.emit(dataurl);
  }

  colorPickerOptions() {
    this.colorPicker = !this.colorPicker;
    if (this.colorPicker)
      this.colorPickerDisplay = 'block';
    else
      this.colorPickerDisplay = 'none';
  }

  selectColor(color) {
    this.curColor.status = false;
    this.curColor = color;
    this.curColor.status = true;
    // this.options.selectionBarGradient.to = this.curColor.colorCode;
  }

  save() {
    // const blob = this.dataURLtoBlob(this.canvas.toDataURL('png'));
    this.redrawCanvas();
    // this.closeModal(this.canvas.toDataURL(this.fileExt));
    // this.uploadBlob(blob);
  }

  removeCurrentImg() {
    this.close.emit({ action: 'remove' })
  }

}
