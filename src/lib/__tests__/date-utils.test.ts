import { describe, it, expect, vi, afterEach, beforeEach } from 'vitest';
import { formatOrderDate, getPickupDateDisplay } from '../date-utils';

describe('Date Utilities', () => {
  beforeEach(() => {
    vi.useFakeTimers();
    vi.setSystemTime(new Date('2026-05-27T10:00:00Z'));
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  describe('formatOrderDate', () => {
    it('should format a valid ISO string', () => {
      expect(formatOrderDate('2026-05-27T10:00:00Z')).toBe('27.05.2026');
    });

    it('should return empty string for missing input', () => {
      expect(formatOrderDate(undefined)).toBe('');
      expect(formatOrderDate(null)).toBe('');
      expect(formatOrderDate('')).toBe('');
    });
  });

  describe('getPickupDateDisplay', () => {
    it('should return "Heute" for today', () => {
      expect(getPickupDateDisplay('2026-05-27')).toBe('Heute');
    });

    it('should format future dates correctly', () => {
      expect(getPickupDateDisplay('2026-05-28')).toBe('Do., 28.05.');
    });

    it('should return empty string for missing input', () => {
      expect(getPickupDateDisplay(undefined)).toBe('');
    });
  });
});
