import { Directive, OnInit, Input, ElementRef, HostListener, AfterContentInit } from '@angular/core';

@Directive({
  selector: '[appScrollable]'
})
export class ScrollableDirective {
  public dataToScroll: app.ScrollingData;

  @Input('appScrollable')
  public delta: number;

  @HostListener('wheel', ['$event'])
  onWheel(event: MouseWheelEvent): void {
    const direction = (event.deltaY > 0) ? 'up' : 'down';
    this.dataToScroll.childs = this.elem.nativeElement.children;
    this.dataToScroll.qtChilds = this.dataToScroll.childs.length;

    switch (direction) {
      case 'down':
        if ((this.dataToScroll.childs[0].getBoundingClientRect().top - this.elem.nativeElement.getBoundingClientRect().top) < 0) {
          this.dataToScroll.position += this.dataToScroll.delta;
        } else {
          this.dataToScroll.position = 0;
        }
        break;
      case 'up':
        if (this.dataToScroll.childs[this.dataToScroll.qtChilds - 1].getBoundingClientRect().top - this.elem.nativeElement.getBoundingClientRect().top >= this.dataToScroll.delta) {
          this.dataToScroll.position -= this.dataToScroll.delta;
        } else {
          this.dataToScroll.position = this.dataToScroll.childs[0].getBoundingClientRect().top - this.dataToScroll.childs[this.dataToScroll.qtChilds - 1].getBoundingClientRect().top;
        }
        break;
    }

    for (let i = 0; i < this.dataToScroll.qtChilds; i++) {
      (this.dataToScroll.childs[i] as HTMLElement).style.top = `${this.dataToScroll.position}px`;
    }
  }

  constructor(
    private elem: ElementRef
  ) {
    this.elem.nativeElement.style.overflow = 'hidden';
  }

  ngAfterContentInit() {
    // console.log(`CONTENT INIT!`);
    this.dataToScroll = {
      childs: this.elem.nativeElement.children,
      qtChilds: this.elem.nativeElement.children.length,
      position: 0,
      delta: (isNaN(Number(this.delta)) || (Number(this.delta) < 5)) ? 10 : Number(this.delta)
    };
    for (let i = 0; i < this.dataToScroll.qtChilds; i++) {
      (this.dataToScroll.childs[i] as HTMLElement).style.position = 'relative';
    }
  }

}