import { TestBed } from '@angular/core/testing';
import { provideHttpClient } from '@angular/common/http';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { DataService } from './data.service';
import { Project, TechStacks } from '../models';
import { afterEach, beforeEach, describe, expect, it } from 'vitest';

describe('DataService', () => {
  let service: DataService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [provideHttpClient(), provideHttpClientTesting()],
    });
    service = TestBed.inject(DataService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => httpMock.verify());

  it('is created', () => {
    expect(service).toBeTruthy();
  });

  describe('getProjects', () => {
    it('aggregates all tech stack entries into the all field', () => {
      const raw = [
        {
          id: 1,
          name: 'Test Project',
          techStacks: { frontEnd: ['Angular'], backEnd: ['Spring Boot'], hosting: ['AWS'] },
        },
      ];

      let result: Project[] = [];
      service.getProjects().subscribe((p) => (result = p));

      httpMock.expectOne('assets/data/projects.json').flush(raw);

      expect(result[0].techStacks.all).toContain('Angular');
      expect(result[0].techStacks.all).toContain('Spring Boot');
      expect(result[0].techStacks.all).toContain('AWS');
      expect(result[0].techStacks.all).not.toContain('all');
    });

    it('does not duplicate entries from the all field itself', () => {
      const raw = [
        {
          id: 2,
          name: 'Project',
          techStacks: { frontEnd: ['React'], all: ['stale'] },
        },
      ];

      let result: Project[] = [];
      service.getProjects().subscribe((p) => (result = p));

      httpMock.expectOne('assets/data/projects.json').flush(raw);

      expect(result[0].techStacks.all).toContain('React');
      expect(result[0].techStacks.all).not.toContain('stale');
    });

    it('falls back to an empty TechStacks when techStacks is missing', () => {
      const raw = [{ id: 3, name: 'No Tech', techStacks: null }];

      let result: Project[] = [];
      service.getProjects().subscribe((p) => (result = p));

      httpMock.expectOne('assets/data/projects.json').flush(raw);

      expect(result[0].techStacks).toBeInstanceOf(TechStacks);
      expect(result[0].techStacks.all).toEqual([]);
    });
  });

  it('getEducations requests the correct endpoint', () => {
    service.getEducations().subscribe();
    httpMock.expectOne('assets/data/educations.json');
  });

  it('getExperiences requests the correct endpoint', () => {
    service.getExperiences().subscribe();
    httpMock.expectOne('assets/data/experiences.json');
  });

  it('getPersonalData requests the correct endpoint', () => {
    service.getPersonalData().subscribe();
    httpMock.expectOne('assets/data/personal.json');
  });

  it('getSkills requests the correct endpoint', () => {
    service.getSkills().subscribe();
    httpMock.expectOne('assets/data/skills.json');
  });

  it('getCerts requests the correct endpoint', () => {
    service.getCerts().subscribe();
    httpMock.expectOne('assets/data/cert.json');
  });
});
