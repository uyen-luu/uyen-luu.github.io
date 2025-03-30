export * from './card.model';
export * from './tags';

export interface Education {
  id: number;
  title: string;
  duration: string;
  institution: string;
}

export interface Experience {
  id: number;
  title: string;
  company: string;
  duration: string;
}

export interface PersonalData {
  name: string;
  profile: string;
  designation: string;
  description: string;
  email: string;
  phone: string;
  address: string;
  socials: Social[];
  devUsername: string;
  resume: string;
}
export interface Social {
  uri: string;
  icon: string;
}
export class TechStacks {
  hosting!: string[];
  database!: string[];
  backEnd!: string[];
  frontEnd!: string[];
  mobile?: string[]; // Optional, if some projects don't have mobile tech
  thirdPartyServices?: string[]; // Optional, since not all projects have third-party services
  all!: string[];
  constructor(init?: Partial<TechStacks>) {
    Object.assign(this, init);
  }
}

export interface Project {
  id: number;
  name: string;
  techStacks: TechStacks;
  position: string;
  teamSize: number | string;
  startDate: string;
  endDate: string;
  duration: string;
  description: string;
  blog: string;
}

export interface Contact {
  email: string;
  phone: string;
  address: string;
  github: string;
  facebook: string;
  linkedIn: string;
  twitter: string;
  stackOverflow: string;
  devUsername: string;
}

export interface Skill {
  name: string;
  imagePath: string;
}
