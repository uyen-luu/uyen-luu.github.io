import { Tag } from './tags';
import { expect, describe, it } from 'vitest';

describe('Tag', () => {
  it('toString returns the display name', () => {
    expect(Tag.ANGULAR.toString()).toBe('Angular');
    expect(Tag.SPRINGBOOT.toString()).toBe('Spring Boot');
    expect(Tag.TYPESCRIPT.toString()).toBe('Typescript');
    expect(Tag.GOLANG.toString()).toBe('Golang');
  });

  it('exposes the correct color per technology group', () => {
    expect(Tag.ANGULAR.color).toBe('#5a7581');       // Java/Angular group
    expect(Tag.POSTGRESQL.color).toBe('#355158');    // DB/infra group
    expect(Tag.PYTHON.color).toBe('#4a6a77');        // Python group
    expect(Tag.TYPESCRIPT.color).toBe('#192129');    // JS/web group
    expect(Tag.GOLANG.color).toBe('#457189');        // Go group
  });

  it('static instances are singletons', () => {
    expect(Tag.ANGULAR).toBe(Tag.ANGULAR);
    expect(Tag.JAVA).not.toBe(Tag.ANGULAR);
  });

  it('all static tags have a non-empty name and color', () => {
    const tags = [
      Tag.ANGULAR, Tag.JAVA, Tag.SPRINGBOOT, Tag.TYPESCRIPT,
      Tag.PYTHON, Tag.DOCKER, Tag.POSTGRESQL, Tag.GOLANG,
    ];
    for (const tag of tags) {
      expect(tag.toString().length).toBeGreaterThan(0);
      expect(tag.color.length).toBeGreaterThan(0);
    }
  });
});
