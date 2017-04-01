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
    myReader.onload = (ev) => {
      // console.log((ev.target as any).result);
      if (file.size <= 1048576) {
        const src = (ev.target as any).result;
        const tmpImg = new Image();
        tmpImg.src = src;
        tmpImg.onload = () => {
          const imgData = this.resizeImage(tmpImg, this.sizeImg);
          // console.log(imgData);
          this.dataUrl.emit(imgData);
        }
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
   * @param image {HTMLImageElement} - картинка
   * @param targetSize {number} - целевой размер меньшей стороны картинки
   * @returns {string} - картинка с изменненным размеров в base64
   */
  private resizeImage(image: HTMLImageElement, targetSize: number): string {
    // расчет новых размеров изображения
    let tempImgSize = {
      width: image.width,
      height: image.height
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
    ctx.drawImage(image, 0, 0, tempImgSize.width, tempImgSize.height);
    const dataUrl = canvas.toDataURL();

    return dataUrl;
  }

}
