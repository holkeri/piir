import React from 'react';
import { render, screen } from '@testing-library/react';
import App from './App';

test('renders new button', () => {
  render(<App />);
  const buttonElement = screen.getByText(/new/i);
  expect(buttonElement).toBeInTheDocument();
});
