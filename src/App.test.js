import React from 'react';
import { createRoot } from 'react-dom/client';
import { act } from 'react-dom/test-utils';
import App from './App';

describe('App', () => {
  let container;
  let root;

  beforeEach(() => {
    container = document.createElement('div');
    document.body.appendChild(container);
    root = createRoot(container);
  });

  afterEach(() => {
    act(() => {
      root.unmount();
    });
    container.remove();
    container = null;
  });

  it('renders key sections from the portfolio', () => {
    act(() => {
      root.render(<App />);
    });

    const aboutHeading = container.querySelector('#about h2');
    expect(aboutHeading).not.toBeNull();
    expect(aboutHeading.textContent).toBe('About Me');

    const portfolioHeading = container.querySelector('#portfolio h1');
    expect(portfolioHeading).not.toBeNull();
    expect(portfolioHeading.textContent).toBe('Samples of Work');

    const contactHeading = container.querySelector('#contact h1 span');
    expect(contactHeading).not.toBeNull();
    expect(contactHeading.textContent).toBe('Let\u2019s Connect');
  });
});
