import { Component, OnInit, Input, Output, NgModule } from '@angular/core';

@Component({
  selector: 'app-file-upload',
  templateUrl: './file-upload.component.html',
  styleUrls: ['./file-upload.component.scss']
})
export class FileUploadComponent implements OnInit {

  @Input()
  sizeImg: number;

  @Output()
  dataUrl: string;
  @Output()
  error: string;

  constructor() { }

  ngOnInit() {
  }

}
