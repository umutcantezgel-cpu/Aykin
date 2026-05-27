import { describe, it, expect } from 'vitest';
import { getCategoryIcon, CategoryIconMap } from '../category-icons';
import { BubbleWaffle, Boxen } from '../index';

describe('Category Icons', () => {
  it('should return the correct icon for a known category', () => {
    const Icon = getCategoryIcon('boxen');
    expect(Icon).toBe(Boxen);
  });

  it('should return a fallback icon (BubbleWaffle) for an unknown category', () => {
    const Icon = getCategoryIcon('unknown-category');
    expect(Icon).toBe(BubbleWaffle);
  });

  it('should have all expected mapped categories', () => {
    expect(Object.keys(CategoryIconMap)).toContain('boxen');
    expect(Object.keys(CategoryIconMap)).toContain('bubble');
    expect(Object.keys(CategoryIconMap)).toContain('crepes');
  });
});
