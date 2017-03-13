import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-file-upload',
  templateUrl: './file-upload.component.html',
  styleUrls: ['./file-upload.component.scss']
})
export class FileUploadComponent implements OnInit {

  @Input()
  sizeImg: number;

  @Output()
  dataUrl: EventEmitter<string> = new EventEmitter<string>();
  @Output()
  error: EventEmitter<string> = new EventEmitter<string>();

  constructor() { }

  ngOnInit() {
  }

  private changeListener($event): void {
    const file: File = $event.target.files[0];
    const myReader: FileReader = new FileReader();
    myReader.readAsDataURL(file);
    myReader.onloadend = (ev) => {
      if (file.size <= 1048576) {
        const imgData = this.resizeImage(myReader.result, this.sizeImg);
        // console.log(imgData);
        this.dataUrl.emit(imgData);
      } else {
        this.dataUrl = null;
        const errorTxt = 'Файл не больше 1Мб!';
        // console.log(errorTxt);
        this.error.emit(errorTxt);
      }
    };
  }

  /**
   * функция изменения размера картинки
   * @param imageBase64 {string} - картинка в base64
   * @param targetSize {number} - целевой размер меньшей стороны картинки
   * @returns {string} - картинка с изменненным размеров в base64
   */
  private resizeImage(imageBase64: string, targetSize: number): string {
    const tempImg = new Image();
    tempImg.src = imageBase64;
    // расчет новых размеров изображения
    let tempImgSize = {
      width: tempImg.width,
      height: tempImg.height
    };
    if (tempImgSize.width > tempImgSize.height) {
      tempImgSize.width = tempImgSize.width * targetSize / tempImgSize.height;
      tempImgSize.height = targetSize;
    } else {
      tempImgSize.height = tempImgSize.height * targetSize / tempImgSize.width;
      tempImgSize.width = targetSize;
    }
    // Создаем холст
    const canvas = document.createElement('canvas');
    canvas.width = tempImgSize.width;
    canvas.height = tempImgSize.height;
    const ctx = canvas.getContext('2d');
    ctx.drawImage(tempImg, 0, 0, tempImgSize.width, tempImgSize.height);
    const dataUrl = canvas.toDataURL();

    return dataUrl;
  }

}
