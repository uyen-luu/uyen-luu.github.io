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
export interface Project {
  id: number;
  name: string;
  description: string;
  tools: string[];
  role: string;
  code: string;
  demo: string;
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
