import { GlowCard } from './card.model';
import { TechStacks } from './index';
import { describe, expect, it } from 'vitest';

describe('TechStacks', () => {
  it('creates with no arguments leaving fields undefined', () => {
    const ts = new TechStacks();
    expect(ts.all).toBeUndefined();
    expect(ts.frontEnd).toBeUndefined();
  });

  it('initializes only provided fields', () => {
    const ts = new TechStacks({ all: ['Angular', 'TypeScript'], frontEnd: ['Angular'] });
    expect(ts.all).toEqual(['Angular', 'TypeScript']);
    expect(ts.frontEnd).toEqual(['Angular']);
    expect(ts.backEnd).toBeUndefined();
  });

  it('supports empty all array', () => {
    const ts = new TechStacks({ all: [] });
    expect(ts.all).toEqual([]);
  });
});

describe('GlowCard', () => {
  it('creates with no arguments leaving fields undefined', () => {
    const card = new GlowCard();
    expect(card.title).toBeUndefined();
    expect(card.url).toBeUndefined();
  });

  it('initializes with provided values', () => {
    const card = new GlowCard({
      id: 1,
      title: 'AWS Certified',
      organization: 'Amazon',
      duration: '2024',
      url: 'https://example.com',
    });
    expect(card.id).toBe(1);
    expect(card.title).toBe('AWS Certified');
    expect(card.organization).toBe('Amazon');
    expect(card.url).toBe('https://example.com');
  });

  it('supports partial initialization', () => {
    const card = new GlowCard({ title: 'Partial Card' });
    expect(card.title).toBe('Partial Card');
    expect(card.organization).toBeUndefined();
  });
});
