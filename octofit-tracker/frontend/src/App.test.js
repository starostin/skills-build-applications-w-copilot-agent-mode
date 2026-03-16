import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';

import App from './App';

test('renders the octofit navigation shell', () => {
  render(
    <BrowserRouter>
      <App />
    </BrowserRouter>
  );

  expect(screen.getByText(/OctoFit Tracker/i)).toBeInTheDocument();
  expect(screen.getByRole('link', { name: /Users/i })).toBeInTheDocument();
  expect(screen.getByRole('link', { name: /Workouts/i })).toBeInTheDocument();
});
