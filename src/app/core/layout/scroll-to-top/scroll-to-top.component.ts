
import {
  AfterViewInit,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
} from '@angular/core';

@Component({
  selector: 'app-scroll-to-top',
  imports: [],
  templateUrl: './scroll-to-top.component.html',
  styleUrl: './scroll-to-top.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ScrollToTopComponent implements AfterViewInit {
  isVisible = false;
  readonly SCROLL_THRESHOLD = 50;
  private scrollElement: HTMLElement | null = null;
  constructor(private _ref: ChangeDetectorRef) {}
  ngAfterViewInit(): void {
    this.scrollElement = document.getElementById('scrollContainer');
    if (this.scrollElement) {
      this.scrollElement.addEventListener('scroll', this.onScroll.bind(this));
    }
  }

  onScroll(): void {
    if (this.scrollElement) {
      const scrollTop = this.scrollElement.scrollTop;
      this.isVisible = scrollTop > this.SCROLL_THRESHOLD;
      this._ref.markForCheck();
    }
  }

  scrollToTop(): void {
    this.scrollElement?.scrollTo({ top: 0, behavior: 'smooth' });
  }
}
