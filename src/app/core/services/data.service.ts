import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, Observable } from 'rxjs';
import {
  Contact,
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

  constructor(private http: HttpClient) {}

  getEducations(): Observable<Education[]> {
    return this.http.get<Education[]>(`${this.basePath}educations.json`);
  }

  getExperiences(): Observable<Experience[]> {
    return this.http.get<Experience[]>(`${this.basePath}experiences.json`);
  }

  getPersonalData(): Observable<PersonalData> {
    return this.http.get<PersonalData>(`${this.basePath}personal.json`);
  }

  getProjects(): Observable<Project[]> {
    return this.http.get<Project[]>(`${this.basePath}projects.json`).pipe(
      map((items) => {
        items.forEach((item) => {
          if (!!item.techStacks) {
            item.techStacks.all = Object.entries(item.techStacks)
              .filter(([key]) => key !== 'all') // Exclude "all" itself
              .flatMap(([, value]) => (Array.isArray(value) ? value : []));
          } else {
            item.techStacks = new TechStacks({ all: [] });
          }
        });
        return items;
      })
    );
  }

  getContact(): Observable<Contact> {
    return this.http.get<Contact>(`${this.basePath}contact.json`);
  }

  getSkills(): Observable<Skill[]> {
    return this.http.get<Skill[]>(`${this.basePath}skills.json`);
  }

  getCerts(): Observable<GlowCard[]> {
    return this.http.get<GlowCard[]>(`${this.basePath}cert.json`);
  }
}
