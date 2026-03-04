import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { ThemeProvider } from './ThemeProvider';
import { useTheme } from './useTheme';

// Test component that uses the theme hook
const ThemeConsumer = () => {
  const { theme, toggleTheme, setTheme } = useTheme();
  return (
    <div>
      <div data-testid="current-theme">{theme}</div>
      <button onClick={toggleTheme}>Toggle Theme</button>
      <button onClick={() => setTheme('light')}>Set Light</button>
      <button onClick={() => setTheme('dark')}>Set Dark</button>
    </div>
  );
};

describe('ThemeProvider', () => {
  beforeEach(() => {
    // Clear localStorage before each test
    localStorage.clear();
    // Clear data-theme attribute
    document.documentElement.removeAttribute('data-theme');
  });

  afterEach(() => {
    localStorage.clear();
  });

  describe('Initialization', () => {
    it('defaults to light theme', () => {
      render(
        <ThemeProvider>
          <ThemeConsumer />
        </ThemeProvider>
      );

      expect(screen.getByTestId('current-theme')).toHaveTextContent('light');
    });

    it('uses defaultTheme when localStorage is empty', () => {
      // Ensure localStorage is empty
      localStorage.clear();

      render(
        <ThemeProvider defaultTheme="dark">
          <ThemeConsumer />
        </ThemeProvider>
      );

      expect(screen.getByTestId('current-theme')).toHaveTextContent('dark');
    });

    it('respects defaultTheme prop', () => {
      render(
        <ThemeProvider defaultTheme="dark">
          <ThemeConsumer />
        </ThemeProvider>
      );

      expect(screen.getByTestId('current-theme')).toHaveTextContent('dark');
    });

    it('loads theme from localStorage if available', () => {
      localStorage.setItem('theme', 'dark');

      render(
        <ThemeProvider>
          <ThemeConsumer />
        </ThemeProvider>
      );

      expect(screen.getByTestId('current-theme')).toHaveTextContent('dark');
    });

    it('sets data-theme attribute on document root', () => {
      render(
        <ThemeProvider defaultTheme="dark">
          <ThemeConsumer />
        </ThemeProvider>
      );

      expect(document.documentElement.getAttribute('data-theme')).toBe('dark');
    });
  });

  describe('Theme Switching', () => {
    it('toggles theme from light to dark', async () => {
      const user = userEvent.setup();

      render(
        <ThemeProvider>
          <ThemeConsumer />
        </ThemeProvider>
      );

      expect(screen.getByTestId('current-theme')).toHaveTextContent('light');

      await user.click(screen.getByText('Toggle Theme'));

      expect(screen.getByTestId('current-theme')).toHaveTextContent('dark');
    });

    it('toggles theme from dark to light', async () => {
      const user = userEvent.setup();

      render(
        <ThemeProvider defaultTheme="dark">
          <ThemeConsumer />
        </ThemeProvider>
      );

      expect(screen.getByTestId('current-theme')).toHaveTextContent('dark');

      await user.click(screen.getByText('Toggle Theme'));

      expect(screen.getByTestId('current-theme')).toHaveTextContent('light');
    });

    it('sets theme to light', async () => {
      const user = userEvent.setup();

      render(
        <ThemeProvider defaultTheme="dark">
          <ThemeConsumer />
        </ThemeProvider>
      );

      await user.click(screen.getByText('Set Light'));

      expect(screen.getByTestId('current-theme')).toHaveTextContent('light');
    });

    it('sets theme to dark', async () => {
      const user = userEvent.setup();

      render(
        <ThemeProvider>
          <ThemeConsumer />
        </ThemeProvider>
      );

      await user.click(screen.getByText('Set Dark'));

      expect(screen.getByTestId('current-theme')).toHaveTextContent('dark');
    });
  });

  describe('Persistence', () => {
    it('saves theme to localStorage when changed', async () => {
      const user = userEvent.setup();

      render(
        <ThemeProvider>
          <ThemeConsumer />
        </ThemeProvider>
      );

      await user.click(screen.getByText('Toggle Theme'));

      expect(localStorage.getItem('theme')).toBe('dark');
    });

    it('updates data-theme attribute when theme changes', async () => {
      const user = userEvent.setup();

      render(
        <ThemeProvider>
          <ThemeConsumer />
        </ThemeProvider>
      );

      await user.click(screen.getByText('Set Dark'));

      expect(document.documentElement.getAttribute('data-theme')).toBe('dark');
    });
  });

  describe('useTheme Hook', () => {
    it('throws error when used outside ThemeProvider', () => {
      // Suppress console.error for this test
      const consoleSpy = vi.spyOn(console, 'error').mockImplementation(() => {});

      expect(() => {
        render(<ThemeConsumer />);
      }).toThrow('useTheme must be used within a ThemeProvider');

      consoleSpy.mockRestore();
    });

    it('provides theme context to children', () => {
      render(
        <ThemeProvider>
          <ThemeConsumer />
        </ThemeProvider>
      );

      expect(screen.getByTestId('current-theme')).toBeInTheDocument();
    });
  });

  describe('Multiple Theme Changes', () => {
    it('handles multiple rapid theme changes', async () => {
      const user = userEvent.setup();

      render(
        <ThemeProvider>
          <ThemeConsumer />
        </ThemeProvider>
      );

      await user.click(screen.getByText('Toggle Theme'));
      expect(screen.getByTestId('current-theme')).toHaveTextContent('dark');

      await user.click(screen.getByText('Toggle Theme'));
      expect(screen.getByTestId('current-theme')).toHaveTextContent('light');

      await user.click(screen.getByText('Set Dark'));
      expect(screen.getByTestId('current-theme')).toHaveTextContent('dark');

      expect(localStorage.getItem('theme')).toBe('dark');
      expect(document.documentElement.getAttribute('data-theme')).toBe('dark');
    });
  });
});
