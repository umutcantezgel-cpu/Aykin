import '@testing-library/jest-dom';
import { vi } from 'vitest';

// Mock window.matchMedia for prefers-reduced-motion
Object.defineProperty(window, 'matchMedia', {
  writable: true,
  value: vi.fn().mockImplementation(query => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: vi.fn(), // deprecated
    removeListener: vi.fn(), // deprecated
    addEventListener: vi.fn(),
    removeEventListener: vi.fn(),
    dispatchEvent: vi.fn(),
  })),
});

// Mock Audio constructor
class AudioMock {
  src = '';
  play = vi.fn().mockResolvedValue(undefined);
  pause = vi.fn();
}

global.Audio = AudioMock as any;
process.env.TZ = 'UTC';
