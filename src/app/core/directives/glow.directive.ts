import {
  ChangeDetectorRef,
  Directive,
  ElementRef,
  HostListener,
  Input,
  OnInit,
  inject,
} from '@angular/core';

@Directive({
  selector: '[appGlowEffect]',
  standalone: true, // <-- Mark this directive as standalone
})
export class GlowDirective implements OnInit {
  @Input() identifier = '';

  private el = inject(ElementRef);
  private _ref = inject(ChangeDetectorRef);

  private config = {
    proximity: 40,
    spread: 80,
    blur: 12,
    gap: 32,
    vertical: false,
    opacity: 0,
  };

  ngOnInit() {
    const container = this.el.nativeElement;
    container.style.setProperty('--gap', this.config.gap.toString());
    container.style.setProperty('--blur', this.config.blur.toString());
    container.style.setProperty('--spread', this.config.spread.toString());
    container.style.setProperty(
      '--direction',
      this.config.vertical ? 'column' : 'row'
    );
  }

  @HostListener('document:mousemove', ['$event'])
  onMouseMove(event: MouseEvent) {
    const cards = this.el.nativeElement.querySelectorAll(
      `.glow-card-${this.identifier}`
    );

    cards.forEach((card: HTMLElement) => {
      const cardBounds = card.getBoundingClientRect();

      if (
        event.x > cardBounds.left - this.config.proximity &&
        event.x < cardBounds.right + this.config.proximity &&
        event.y > cardBounds.top - this.config.proximity &&
        event.y < cardBounds.bottom + this.config.proximity
      ) {
        card.style.setProperty('--active', '1');
      } else {
        card.style.setProperty('--active', this.config.opacity.toString());
      }

      const cardCenter = [
        cardBounds.left + cardBounds.width / 2,
        cardBounds.top + cardBounds.height / 2,
      ];
      let angle =
        (Math.atan2(event.y - cardCenter[1], event.x - cardCenter[0]) * 180) /
        Math.PI;
      angle = angle < 0 ? angle + 360 : angle;
      card.style.setProperty('--start', (angle + 90).toString());
    });

    this._ref.markForCheck();
  }
}
