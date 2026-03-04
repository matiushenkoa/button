import { useState } from 'react';
import { useTheme } from '../../theme/useTheme';
import { Button } from '../../design-system/Button';
import { PlusIcon, ArrowIcon } from '../../design-system/icons';

export function DemoContent() {
  const { theme, toggleTheme } = useTheme();
  const [loading, setLoading] = useState(false);
  const [clickCount, setClickCount] = useState(0);

  function handleClick() {
    setClickCount((c) => c + 1);
  }

  function handleAsyncAction() {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setClickCount((prev) => prev + 1);
    }, 2000);
  }

  return (
    <div className="app">
      <header className="app-header">
        <h1>Design System: Button Component</h1>
        <p className="subtitle">A scalable, accessible button component with theme support</p>
      </header>

      <main>
        <section className="demo-section">
          <div className="section-header">
            <h2>Theme Toggle</h2>
            <div className="theme-indicator">
              Current theme: <strong>{theme}</strong>
            </div>
          </div>
          <Button onClick={toggleTheme} variant="secondary">
            Switch to {theme === 'light' ? 'Dark' : 'Light'} Mode
          </Button>
        </section>

        <section className="demo-section">
          <h2>Button Variants</h2>
          <div className="button-grid">
            <Button variant="primary" onClick={handleClick}>
              Primary
            </Button>
            <Button variant="secondary" onClick={handleClick}>
              Secondary
            </Button>
            <Button variant="danger" onClick={handleClick}>
              Danger
            </Button>
            <Button variant="success" onClick={handleClick}>
              Success
            </Button>
          </div>
          <div className="click-counter">
            Total clicks: <strong>{clickCount}</strong>
          </div>
        </section>

        <section className="demo-section">
          <h2>Button Sizes</h2>
          <div className="button-grid">
            <Button size="small" onClick={handleClick}>
              Small
            </Button>
            <Button size="medium" onClick={handleClick}>
              Medium
            </Button>
            <Button size="large" onClick={handleClick}>
              Large
            </Button>
          </div>
        </section>

        <section className="demo-section">
          <h2>Disabled State</h2>
          <div className="button-grid">
            <Button variant="primary" disabled>
              Disabled Primary
            </Button>
            <Button variant="secondary" disabled>
              Disabled Secondary
            </Button>
            <Button variant="danger" disabled>
              Disabled Danger
            </Button>
            <Button variant="success" disabled>
              Disabled Success
            </Button>
          </div>
        </section>

        <section className="demo-section">
          <h2>Loading State</h2>
          <div className="button-grid">
            <Button loading={loading} onClick={handleAsyncAction}>
              {loading ? 'Processing...' : 'Async Action'}
            </Button>
            <Button variant="secondary" loading>
              Always Loading
            </Button>
          </div>
        </section>

        <section className="demo-section">
          <h2>Buttons with Icons</h2>
          <div className="button-grid">
            <Button leftIcon={<PlusIcon />} onClick={handleClick}>
              Add Item
            </Button>
            <Button variant="secondary" rightIcon={<ArrowIcon />} onClick={handleClick}>
              Continue
            </Button>
            <Button
              variant="success"
              leftIcon={<PlusIcon />}
              rightIcon={<ArrowIcon />}
              onClick={handleClick}
            >
              Both Icons
            </Button>
            <Button size="small" leftIcon={<PlusIcon />} onClick={handleClick}>
              Small with Icon
            </Button>
          </div>
        </section>

        <section className="demo-section">
          <h2>Full Width Buttons</h2>
          <div className="full-width-demo">
            <Button fullWidth onClick={handleClick}>
              Full Width Primary
            </Button>
            <Button fullWidth variant="secondary" onClick={handleClick}>
              Full Width Secondary
            </Button>
          </div>
        </section>

        <section className="demo-section">
          <h2>Accessibility Features</h2>
          <div className="accessibility-info">
            <ul>
              <li>✓ Keyboard navigation (Tab, Enter, Space)</li>
              <li>✓ Screen reader support with ARIA attributes</li>
              <li>✓ Focus visible indicators</li>
              <li>✓ Proper disabled and loading states</li>
              <li>✓ Color contrast meets WCAG 2.1 AA standards</li>
              <li>✓ Supports prefers-reduced-motion</li>
              <li>✓ High contrast mode support</li>
            </ul>
          </div>
          <div className="button-grid">
            <Button aria-label="Save document" leftIcon={<PlusIcon />}>
              Save
            </Button>
            <Button type="submit" variant="success">
              Submit Form
            </Button>
          </div>
        </section>
      </main>

      <footer className="app-footer">
        <p>
          Built with React + TypeScript + Vite
          <br />
          Tested with Vitest + React Testing Library
        </p>
      </footer>
    </div>
  );
}
