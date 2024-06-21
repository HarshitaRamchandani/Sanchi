import { Directive, ElementRef, Renderer2, HostListener } from '@angular/core';

@Directive({
  selector: '[appShowPopup]',
  standalone: true
})
export class ShowPopupDirective {

  constructor(private el: ElementRef, private renderer: Renderer2) {}

  @HostListener('click') onClick() {
    this.showPopup();
  }

  private showPopup() {
    const popup = this.renderer.createElement('div');
    const text = this.renderer.createText('🌼 Added to cart 🌼');

    this.renderer.appendChild(popup, text);
    this.renderer.setStyle(popup, 'position', 'fixed');
    this.renderer.setStyle(popup, 'top', '20px');
    this.renderer.setStyle(popup, 'left', '50%');
    this.renderer.setStyle(popup, 'transform', 'translateX(-50%)');
    this.renderer.setStyle(popup, 'backgroundColor', 'green');
    this.renderer.setStyle(popup, 'color', '#fff');
    this.renderer.setStyle(popup, 'padding', '10px 15px');
    this.renderer.setStyle(popup, 'borderRadius', '5px');
    this.renderer.setStyle(popup, 'zIndex', '1000');
    this.renderer.setStyle(popup, 'transition', 'opacity 0.5s');
    this.renderer.setStyle(popup, 'opacity', '1');

    this.renderer.appendChild(document.body, popup);

    setTimeout(() => {
      this.renderer.setStyle(popup, 'opacity', '0');
      setTimeout(() => {
        this.renderer.removeChild(document.body, popup);
      }, 500);
    }, 1000);
  }

}
