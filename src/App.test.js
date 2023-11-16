import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import Login from './pages/login';
import Signup from './pages/signup';

// Group of tests for App components
describe('App Component Tests', () => {
  // Test to check if the Login component renders correctly
  test('renders Login component', () => {
    // Renders the Login component within a MemoryRouter for testing
    render(
      <MemoryRouter>
        <Login />
      </MemoryRouter>
    );
    // Checks if a button with text 'login' (case-insensitive) is in the document
    expect(screen.getByRole('button', { name: /login/i })).toBeInTheDocument();
  });

  // Test to check if the Signup component renders correctly
  test('renders Signup component', () => {
    // Renders the Signup component within a MemoryRouter for testing
    render(
      <MemoryRouter>
        <Signup />
      </MemoryRouter>
    );
    // Fetches a heading element with text 'Sign Up' (case-insensitive)
    const heading = screen.getByRole('heading', { name: /sign up/i });
    // Checks if the heading is in the document
    expect(heading).toBeInTheDocument();
  });
});

// Note: These tests ensure that the specified elements are rendered in the respective components.
