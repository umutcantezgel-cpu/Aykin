import React from 'react';
import { render, screen, fireEvent, act } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { Logo } from '../Logo';
import { ScallopBadge } from '../ScallopBadge';
import { PrimaryCTA } from '../buttons/PrimaryCTA';
import { useAchievements } from '@/store/useAchievements';

// Mock framer-motion to avoid animation issues in jsdom
vi.mock('framer-motion', async () => {
  const actual = await vi.importActual('framer-motion');
  return {
    ...actual,
    useReducedMotion: () => false,
  };
});

describe('Atoms', () => {
  describe('Logo', () => {
    it('should render with default variant', () => {
      render(<Logo data-testid="logo" />);
      const logo = screen.getByTestId('logo');
      expect(logo).toHaveStyle({ aspectRatio: '1 / 1' });
    });

    it('should render with light variant', () => {
      render(<Logo variant="light" data-testid="logo-light" />);
      expect(screen.getByTestId('logo-light')).toBeInTheDocument();
    });

    it('should render with dark variant', () => {
      render(<Logo variant="dark" data-testid="logo-dark" />);
      expect(screen.getByTestId('logo-dark')).toBeInTheDocument();
    });

    it('should unlock sweet-tooth achievement on triple tap', () => {
      vi.useFakeTimers();
      
      const unlockSpy = vi.spyOn(useAchievements.getState(), 'unlock');
      render(<Logo data-testid="logo-click" />);
      const logo = screen.getByTestId('logo-click');
      
      fireEvent.click(logo);
      vi.advanceTimersByTime(100);
      fireEvent.click(logo);
      vi.advanceTimersByTime(100);
      fireEvent.click(logo);

      expect(unlockSpy).toHaveBeenCalledWith('sweet-tooth');
      
      vi.useRealTimers();
    });
  });

  describe('ScallopBadge', () => {
    it('should apply rotate style', () => {
      render(
        <div data-testid="scallop-wrapper">
          <ScallopBadge rotate={45} />
        </div>
      );
      const container = screen.getByTestId('scallop-wrapper').firstElementChild as HTMLElement;
      expect(container).toHaveStyle({ transform: 'rotate(45deg)' });
    });

    it('should render children', () => {
      render(<ScallopBadge>Test Badge</ScallopBadge>);
      expect(screen.getByText('Test Badge')).toBeInTheDocument();
    });
  });

  describe('PrimaryCTA', () => {
    beforeEach(() => {
      vi.useFakeTimers();
    });

    afterEach(() => {
      vi.useRealTimers();
    });

    it('should render children and arrow if showArrow is true', () => {
      render(<PrimaryCTA showArrow>Click Me</PrimaryCTA>);
      expect(screen.getByText('Click Me')).toBeInTheDocument();
      // Arrow is rendered as a chevron icon (svg)
      expect(document.querySelector('svg')).toBeInTheDocument();
    });

    it('should trigger particle burst and call onClick', () => {
      const onClickMock = vi.fn();
      render(<PrimaryCTA onClick={onClickMock}>Click Me</PrimaryCTA>);
      
      const button = screen.getByRole('button', { name: 'Click Me' });
      
      act(() => {
        fireEvent.click(button);
      });
      
      expect(onClickMock).toHaveBeenCalled();
      
      act(() => {
        vi.advanceTimersByTime(800);
      });
    });
  });
});
