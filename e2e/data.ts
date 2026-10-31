import { readFileSync } from 'node:fs';
import { join } from 'node:path';

// Expected content comes from the same JSON files the app loads, so tests follow data changes.
function readData<T>(file: string): T {
  return JSON.parse(readFileSync(join(__dirname, '../src/assets/data', file), 'utf-8')) as T;
}

export interface Personal {
  name: string;
  designation: string;
  resume: string;
  socials: { uri: string; icon: string }[];
}

export interface Skill {
  name: string;
  imagePath: string;
  category: string;
}

export const personal = readData<Personal>('personal.json');
export const skills = readData<Skill[]>('skills.json');
