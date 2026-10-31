import {
  ChangeDetectionStrategy,
  Component,
  DestroyRef,
  afterNextRender,
  inject,
  signal,
} from '@angular/core';

@Component({
  selector: 'app-scroll-to-top',
  imports: [],
  templateUrl: './scroll-to-top.component.html',
  styleUrl: './scroll-to-top.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ScrollToTopComponent {
  isVisible = signal(false);
  readonly SCROLL_THRESHOLD = 50;
  private scrollElement: HTMLElement | null = null;

  constructor() {
    const destroyRef = inject(DestroyRef);
    afterNextRender(() => {
      const element = document.getElementById('scrollContainer');
      if (!element) {
        return;
      }
      this.scrollElement = element;
      const onScroll = () =>
        this.isVisible.set(element.scrollTop > this.SCROLL_THRESHOLD);
      element.addEventListener('scroll', onScroll, { passive: true });
      destroyRef.onDestroy(() =>
        element.removeEventListener('scroll', onScroll)
      );
    });
  }

  scrollToTop(): void {
    this.scrollElement?.scrollTo({ top: 0, behavior: 'smooth' });
  }
}
