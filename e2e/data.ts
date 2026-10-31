import { readFileSync } from 'node:fs';
import { join } from 'node:path';

// Expected content comes from the same JSON files the app loads, so tests follow data changes.
function readData<T>(file: string): T {
  return JSON.parse(readFileSync(join(__dirname, '../src/assets/data', file), 'utf-8')) as T;
}

export interface Personal {
  name: string;
  designation: string;
  description: string;
  email: string;
  phone: string;
  address: string;
  resume: string;
  socials: { uri: string; icon: string }[];
}

/** One entry in the experience, certification or education panel. */
export interface Card {
  title: string;
  organization: string;
  duration: string;
  url?: string;
}

export interface Project {
  name: string;
  position: string;
}

export interface Skill {
  name: string;
  imagePath: string;
  category: string;
}

export const personal = readData<Personal>('personal.json');
export const skills = readData<Skill[]>('skills.json');
export const projects = readData<Project[]>('projects.json');

// The app maps company/institution onto the card's organization line; mirror that here.
export const panels: { id: string; title: string; items: Card[] }[] = [
  {
    id: 'experience',
    title: 'Experiences',
    items: readData<(Card & { company: string })[]>('experiences.json').map((i) => ({ ...i, organization: i.company })),
  },
  { id: 'certs', title: 'Certifications', items: readData<Card[]>('cert.json') },
  {
    id: 'education',
    title: 'Educations',
    items: readData<(Card & { institution: string })[]>('educations.json').map((i) => ({
      ...i,
      organization: i.institution,
    })),
  },
];
