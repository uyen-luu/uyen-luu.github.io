import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  OnInit,
} from '@angular/core';
import { Title } from '@angular/platform-browser';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-home',
  imports: [RouterLink],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HomeComponent implements OnInit {
  dynamicText: string = '';
  phrases: string[] = [
    '.Net Developer.',
    'Angular Developer.',
    'Azure Developer',
    'Fullstack Developer',
  ];

  quote!: string;

  currentPhraseIndex: number = 0;
  currentCharIndex: number = 0;
  isDeleting: boolean = false;
  typingSpeed: number = 100;
  deletingSpeed: number = 100;
  delayBetweenPhrases: number = 2000;

  constructor(private titleService: Title, private _ref: ChangeDetectorRef) {
    this.titleService.setTitle('UL | Home');
  }

  ngOnInit(): void {
    this.getQuote();
    this.type();
  }

  private calculateDiff(from: Date, to: Date) {
    return Math.floor(
      (Date.UTC(from.getFullYear(), from.getMonth(), from.getDate()) -
        Date.UTC(to.getFullYear(), to.getMonth(), to.getDate())) /
        (1000 * 60 * 60 * 24)
    );
  }
  private getQuote() {
    const startDate = new Date('2017-01-16');
    const diff = this.calculateDiff(startDate, new Date());
    this.quote = `I am a developer with ${Math.round(
      Math.abs(diff / 365)
    )} years experience in building software. I
        leverage my fluency in English, college education, and coding skills to
        craft accessible, scalable and high-performance applications.`;
  }

  type() {
    const currentPhrase = this.phrases[this.currentPhraseIndex];
    if (this.isDeleting) {
      this.dynamicText = currentPhrase.substring(0, this.currentCharIndex - 1);
      this.currentCharIndex--;
    } else {
      this.dynamicText = currentPhrase.substring(0, this.currentCharIndex + 1);
      this.currentCharIndex++;
    }

    if (!this.isDeleting && this.currentCharIndex === currentPhrase.length) {
      this.isDeleting = true;
      setTimeout(() => this.type(), this.delayBetweenPhrases);
    } else if (this.isDeleting && this.currentCharIndex === 0) {
      this.isDeleting = false;
      this.currentPhraseIndex =
        (this.currentPhraseIndex + 1) % this.phrases.length;
      setTimeout(() => this.type(), 500);
    } else {
      const speed = this.isDeleting ? this.deletingSpeed : this.typingSpeed;
      setTimeout(() => this.type(), speed);
    }
    this._ref.detectChanges();
  }
}
