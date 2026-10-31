import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  afterRenderEffect,
  inject,
  signal,
  viewChild,
} from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { CodePreviewComponent } from '@app/core/layout/code-preview/code-preview.component';
import { DataService } from '@app/core/services';

const FALLBACK_CARD_TOP_INCREMENT_PX = 64; // 4rem, used only if the header can't be measured yet
const BOTTOM_BUFFER_PX = 32;

@Component({
  selector: 'app-project',
  imports: [CodePreviewComponent],
  templateUrl: './project.component.html',
  styleUrl: './project.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProjectComponent {
  projects = toSignal(inject(DataService).getProjects(), { initialValue: [] });
  cardTopIncrementPx = signal(FALLBACK_CARD_TOP_INCREMENT_PX);
  maxCardTopPx = signal(Infinity);
  private stickyHeaderRef = viewChild<ElementRef<HTMLElement>>('stickyHeader');

  constructor() {
    // Runs after the @for loop has patched the DOM with the cards, so one
    // can actually be measured.
    afterRenderEffect(() => {
      if (this.projects().length) {
        this.computeCardTopLayout();
      }
    });
  }

  getCardTopPx(index: number): number {
    return Math.min(
      (index + 1) * this.cardTopIncrementPx(),
      this.maxCardTopPx()
    );
  }

  /**
   * The sticky-card "peek" effect stacks each card at
   * top: (index + 1) * increment, so a minimized card always keeps its own
   * header height as the increment -- otherwise its title gets clipped.
   * But increment * card count can exceed the scroll container's height
   * once there are enough projects, and a card whose required top exceeds
   * the container can never be visible at all while stuck. Clamping the
   * top at the container's available height means cards beyond that point
   * share the same position and fully replace each other in turn, instead
   * of some being permanently invisible.
   */
  private computeCardTopLayout(): void {
    const container = document.getElementById('scrollContainer');
    const header = this.stickyHeaderRef()?.nativeElement;
    if (!container || !header) {
      return;
    }
    const cardHeaderHeight = document
      .querySelector('.sticky-card .code-preview-header')
      ?.getBoundingClientRect().height;
    this.cardTopIncrementPx.set(
      cardHeaderHeight || FALLBACK_CARD_TOP_INCREMENT_PX
    );

    // Use the sticky header's own CSS offset + intrinsic height rather than
    // getBoundingClientRect(), which depends on the current scroll position
    // (this can run before the projects section has ever been scrolled into
    // view, when the unstuck header still sits far below the viewport).
    const stickyTopOffset = parseFloat(getComputedStyle(header).top) || 0;
    this.maxCardTopPx.set(
      container.clientHeight -
        stickyTopOffset -
        header.offsetHeight -
        BOTTOM_BUFFER_PX
    );
  }
}
