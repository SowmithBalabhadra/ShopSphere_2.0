import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { MemoryRouter } from 'react-router-dom';
import LoginComponent from '../../src/components/LoginComponent/LoginComponent';

describe('LoginComponent', () => {
  test('renders login header and toggle button', () => {
    render(
      <MemoryRouter>
        <LoginComponent />
      </MemoryRouter>
    );

    // These texts exist based on the component's initial state
    expect(screen.getByText(/admin login/i)).toBeInTheDocument();
    expect(screen.getByText(/create an account/i)).toBeInTheDocument();
  });
});
