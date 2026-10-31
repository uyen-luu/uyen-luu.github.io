import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, Observable, shareReplay } from 'rxjs';
import {
  Education,
  Experience,
  GlowCard,
  PersonalData,
  Project,
  Skill,
  TechStacks,
} from '../models';

@Injectable({
  providedIn: 'root',
})
export class DataService {
  private basePath = 'assets/data/';
  private http = inject(HttpClient);

  // Several components read the same files, so each request is made once and replayed.
  private personalData$ = this.load<PersonalData>('personal.json');
  private projects$ = this.http.get<Project[]>(`${this.basePath}projects.json`).pipe(
    map((items) => {
      items.forEach((item) => {
        if (item.techStacks) {
          item.techStacks.all = Object.entries(item.techStacks)
            .filter(([key]) => key !== 'all') // Exclude "all" itself
            .flatMap(([, value]) => (Array.isArray(value) ? value : []));
        } else {
          item.techStacks = new TechStacks({ all: [] });
        }
      });
      return items;
    }),
    shareReplay(1)
  );
  private skills$ = this.load<Skill[]>('skills.json');

  getEducations(): Observable<Education[]> {
    return this.http.get<Education[]>(`${this.basePath}educations.json`);
  }

  getExperiences(): Observable<Experience[]> {
    return this.http.get<Experience[]>(`${this.basePath}experiences.json`);
  }

  getPersonalData(): Observable<PersonalData> {
    return this.personalData$;
  }

  getProjects(): Observable<Project[]> {
    return this.projects$;
  }

  getSkills(): Observable<Skill[]> {
    return this.skills$;
  }

  getCerts(): Observable<GlowCard[]> {
    return this.http.get<GlowCard[]>(`${this.basePath}cert.json`);
  }

  private load<T>(file: string): Observable<T> {
    return this.http.get<T>(`${this.basePath}${file}`).pipe(shareReplay(1));
  }
}
