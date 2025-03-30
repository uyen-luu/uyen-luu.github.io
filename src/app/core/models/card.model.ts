import { Tag } from './tags';

export interface Card {
  id: number;
  name: string;
  summary: string;
  description: string;
  projectLink: string;
  pictures: string[];
  tags: Tag[];
}

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
