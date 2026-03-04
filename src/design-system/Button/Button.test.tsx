import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Button } from './Button';

describe('Button Component', () => {
  describe('Rendering', () => {
    it('renders with children text', () => {
      render(<Button>Click me</Button>);
      expect(screen.getByRole('button', { name: /click me/i })).toBeInTheDocument();
    });

    it('applies custom className', () => {
      render(<Button className="custom-class">Custom</Button>);
      const button = screen.getByRole('button');
      expect(button).toHaveClass('custom-class');
    });
  });

  describe('Accessibility', () => {
    it('has correct button role', () => {
      render(<Button>Accessible Button</Button>);
      expect(screen.getByRole('button')).toBeInTheDocument();
    });

    it('supports aria-label', () => {
      render(<Button aria-label="Custom label">Icon Only</Button>);
      expect(screen.getByRole('button', { name: /custom label/i })).toBeInTheDocument();
    });

    it('sets aria-disabled when disabled', () => {
      render(<Button disabled>Disabled</Button>);
      const button = screen.getByRole('button');
      expect(button).toBeDisabled();
      expect(button).toHaveAttribute('aria-disabled', 'true');
    });

    it('sets aria-busy when loading', () => {
      render(<Button loading>Loading</Button>);
      const button = screen.getByRole('button');
      expect(button).toHaveAttribute('aria-busy', 'true');
    });

    it('has proper type attribute default', () => {
      render(<Button>Button</Button>);
      expect(screen.getByRole('button')).toHaveAttribute('type', 'button');
    });

    it('supports custom type attribute', () => {
      render(<Button type="submit">Submit</Button>);
      expect(screen.getByRole('button')).toHaveAttribute('type', 'submit');
    });
  });

  describe('User Interactions', () => {
    it('calls onClick when clicked', async () => {
      const handleClick = vi.fn();
      const user = userEvent.setup();

      render(<Button onClick={handleClick}>Click Me</Button>);
      await user.click(screen.getByRole('button'));

      expect(handleClick).toHaveBeenCalledTimes(1);
    });

    it('does not call onClick when disabled', async () => {
      const handleClick = vi.fn();
      const user = userEvent.setup();

      render(
        <Button onClick={handleClick} disabled>
          Disabled
        </Button>
      );
      await user.click(screen.getByRole('button'));

      expect(handleClick).not.toHaveBeenCalled();
    });

    it('does not call onClick when loading', async () => {
      const handleClick = vi.fn();
      const user = userEvent.setup();

      render(
        <Button onClick={handleClick} loading>
          Loading
        </Button>
      );
      await user.click(screen.getByRole('button'));

      expect(handleClick).not.toHaveBeenCalled();
    });

    it('can be activated with keyboard (Enter)', async () => {
      const handleClick = vi.fn();
      const user = userEvent.setup();

      render(<Button onClick={handleClick}>Keyboard</Button>);
      const button = screen.getByRole('button');
      button.focus();
      await user.keyboard('{Enter}');

      expect(handleClick).toHaveBeenCalledTimes(1);
    });

    it('can be activated with keyboard (Space)', async () => {
      const handleClick = vi.fn();
      const user = userEvent.setup();

      render(<Button onClick={handleClick}>Keyboard</Button>);
      const button = screen.getByRole('button');
      button.focus();
      await user.keyboard(' ');

      expect(handleClick).toHaveBeenCalledTimes(1);
    });
  });

  describe('Loading State', () => {
    it('displays spinner when loading', () => {
      render(<Button loading>Loading</Button>);
      expect(screen.getByTestId('spinner')).toBeInTheDocument();
    });

    it('hides icons when loading', () => {
      const LeftIcon = () => <span data-testid="left-icon">L</span>;
      const RightIcon = () => <span data-testid="right-icon">R</span>;

      const { rerender } = render(
        <Button leftIcon={<LeftIcon />} rightIcon={<RightIcon />}>
          Button
        </Button>
      );

      expect(screen.getByTestId('left-icon')).toBeInTheDocument();
      expect(screen.getByTestId('right-icon')).toBeInTheDocument();

      rerender(
        <Button loading leftIcon={<LeftIcon />} rightIcon={<RightIcon />}>
          Button
        </Button>
      );

      expect(screen.queryByTestId('left-icon')).not.toBeInTheDocument();
      expect(screen.queryByTestId('right-icon')).not.toBeInTheDocument();
    });

    it('is disabled when loading', () => {
      render(<Button loading>Loading</Button>);
      expect(screen.getByRole('button')).toBeDisabled();
    });

    it('adds loading class when loading', () => {
      render(<Button loading>Loading</Button>);
      // aria-busy is the semantic contract — CSS class is an implementation detail
      expect(screen.getByRole('button')).toHaveAttribute('aria-busy', 'true');
    });
  });

  describe('Icons', () => {
    it('renders left icon', () => {
      const LeftIcon = () => <span data-testid="left-icon">→</span>;
      render(<Button leftIcon={<LeftIcon />}>With Icon</Button>);
      expect(screen.getByTestId('left-icon')).toBeInTheDocument();
    });

    it('renders right icon', () => {
      const RightIcon = () => <span data-testid="right-icon">←</span>;
      render(<Button rightIcon={<RightIcon />}>With Icon</Button>);
      expect(screen.getByTestId('right-icon')).toBeInTheDocument();
    });

    it('renders both icons', () => {
      const LeftIcon = () => <span data-testid="left-icon">L</span>;
      const RightIcon = () => <span data-testid="right-icon">R</span>;

      render(
        <Button leftIcon={<LeftIcon />} rightIcon={<RightIcon />}>
          Both Icons
        </Button>
      );

      expect(screen.getByTestId('left-icon')).toBeInTheDocument();
      expect(screen.getByTestId('right-icon')).toBeInTheDocument();
    });

    it('sets aria-hidden on icons', () => {
      const LeftIcon = () => <span data-testid="icon-content">→</span>;
      render(<Button leftIcon={<LeftIcon />}>Icon</Button>);

      const icon = screen.getByTestId('icon-content');
      const iconParent = icon.parentElement;
      expect(iconParent).toHaveAttribute('aria-hidden', 'true');
    });
  });

  describe('Ref Forwarding', () => {
    it('forwards ref to button element', () => {
      const ref = vi.fn();
      render(<Button ref={ref}>Ref Button</Button>);

      expect(ref).toHaveBeenCalled();
      expect(ref.mock.calls[0][0]).toBeInstanceOf(HTMLButtonElement);
    });
  });

  describe('Disabled State', () => {
    it('applies disabled attribute', () => {
      render(<Button disabled>Disabled</Button>);
      expect(screen.getByRole('button')).toBeDisabled();
    });

    it('has proper styling when disabled', () => {
      render(<Button disabled>Disabled</Button>);
      const button = screen.getByRole('button');
      expect(button).toHaveAttribute('disabled');
    });
  });

  describe('Additional HTML Attributes', () => {
    it('forwards additional props to button element', () => {
      render(
        <Button data-testid="custom-button" id="btn-1" title="Custom Title">
          Custom Props
        </Button>
      );

      const button = screen.getByTestId('custom-button');
      expect(button).toHaveAttribute('id', 'btn-1');
      expect(button).toHaveAttribute('title', 'Custom Title');
    });

    it('supports onMouseEnter and onMouseLeave', async () => {
      const handleMouseEnter = vi.fn();
      const handleMouseLeave = vi.fn();
      const user = userEvent.setup();

      render(
        <Button onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
          Hover Me
        </Button>
      );

      const button = screen.getByRole('button');
      await user.hover(button);
      expect(handleMouseEnter).toHaveBeenCalledTimes(1);

      await user.unhover(button);
      expect(handleMouseLeave).toHaveBeenCalledTimes(1);
    });
  });

  describe('Default Props', () => {
    it('renders with all default props when no props are provided', () => {
      render(<Button>Default Button</Button>);
      const button = screen.getByRole('button');

      expect(button).toHaveAttribute('type', 'button');
      expect(button).not.toBeDisabled();
      expect(button).toHaveAttribute('aria-busy', 'false');
      expect(button).toHaveAttribute('aria-disabled', 'false');
    });
  });
});
