
import {
  Component,
  ElementRef,
  Input,
  AfterViewInit,
  OnDestroy,
  Renderer2,
  ViewChild,
  inject,
  ChangeDetectionStrategy
} from '@angular/core';

@Component({
  selector: 'app-glow-card',
  templateUrl: './glow-card.component.html',
  styleUrls: ['./glow-card.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [],
})
export class GlowCardComponent implements AfterViewInit, OnDestroy {
  @Input() identifier!: string;
  @ViewChild('container', { static: true }) containerRef!: ElementRef;
  @ViewChild('card', { static: true }) cardRef!: ElementRef;

  private pointerMoveListener?: () => void;
  private renderer = inject(Renderer2);
  private CONFIG = {
    proximity: 40,
    spread: 80,
    blur: 12,
    gap: 32,
    vertical: false,
    opacity: 0,
  };

  ngAfterViewInit(): void {
    this.restyle();
    this.updateGlowEffect();
    this.pointerMoveListener = this.renderer.listen(
      'body',
      'pointermove',
      (event: MouseEvent) => {
        this.updateGlowEffect(event);
      }
    );
  }

  private updateGlowEffect(event?: MouseEvent): void {
    const card = this.cardRef.nativeElement;
    const cardBounds = card.getBoundingClientRect();
    const x = event?.x || 0;
    const y = event?.y || 0;
    if (
      x > cardBounds.left - this.CONFIG.proximity &&
      x < cardBounds.right + this.CONFIG.proximity &&
      y > cardBounds.top - this.CONFIG.proximity &&
      y < cardBounds.bottom + this.CONFIG.proximity
    ) {
      card.style.setProperty('--active', '1');
    } else {
      card.style.setProperty('--active', this.CONFIG.opacity.toString());
    }

    const cardCenter = [
      cardBounds.left + cardBounds.width * 0.5,
      cardBounds.top + cardBounds.height * 0.5,
    ];
    let angle =
      (Math.atan2(y - cardCenter[1], x - cardCenter[0]) * 180) / Math.PI;
    angle = angle < 0 ? angle + 360 : angle;

    card.style.setProperty('--start', `${angle + 90}`);
  }

  private restyle(): void {
    const container = this.containerRef.nativeElement;
    container.style.setProperty('--gap', `${this.CONFIG.gap}`);
    container.style.setProperty('--blur', `${this.CONFIG.blur}`);
    container.style.setProperty('--spread', `${this.CONFIG.spread}`);
    container.style.setProperty(
      '--direction',
      this.CONFIG.vertical ? 'column' : 'row'
    );
  }

  ngOnDestroy(): void {
    if (this.pointerMoveListener) {
      this.pointerMoveListener();
    }
  }
}
