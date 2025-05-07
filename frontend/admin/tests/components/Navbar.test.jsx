import React from 'react';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import '@testing-library/jest-dom'; // ✅ Add this!

import Navbar from '../../src/components/Navbar/Navbar';

describe('Navbar Component', () => {
  test('renders logo image', () => {
    render(
      <MemoryRouter>
        <Navbar />
      </MemoryRouter>
    );
    const logo = screen.getByAltText('Logo');
    expect(logo).toBeInTheDocument();
  });

  test('renders profile image', () => {
    render(
      <MemoryRouter>
        <Navbar />
      </MemoryRouter>
    );
    const profile = screen.getByAltText('Profile');
    expect(profile).toBeInTheDocument();
  });
});
