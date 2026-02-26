import { Directive, ElementRef, Input, OnChanges, Renderer2 } from '@angular/core';

@Directive({
  selector: '[appStatusHighlight]',
  standalone: true
})
export class StatusHighlightDirective implements OnChanges {
  @Input() appStatusHighlight: boolean = true;

  constructor(private el: ElementRef, private renderer: Renderer2) {}

  ngOnChanges() {
    if (this.appStatusHighlight) {
      this.renderer.setStyle(this.el.nativeElement, 'border-left', '5px solid #4caf50');
    } else {
      this.renderer.removeStyle(this.el.nativeElement, 'border-left');
    }
  }
}