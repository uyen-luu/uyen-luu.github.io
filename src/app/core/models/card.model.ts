export class GlowCard {
  id!: number;
  title!: string;
  organization!: string;
  duration!: string;
  url!: string;
  constructor(init?: Partial<GlowCard>) {
    Object.assign(this, init);
  }
}
