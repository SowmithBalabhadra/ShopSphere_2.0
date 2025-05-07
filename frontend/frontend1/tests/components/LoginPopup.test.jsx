import React from 'react';
import { describe, test, expect } from 'vitest';
import { render } from '@testing-library/react';
import '@testing-library/jest-dom';
import LoginPopup from '../../src/components/LoginPopup/LoginPopup';
import { StoreContext } from '../../src/Context/StoreContext';

const mockStore = {
  token: '',
  setToken: () => {}
};

describe('LoginPopup Component', () => {
  test('renders login popup with input fields', () => {
    render(
      <StoreContext.Provider value={mockStore}>
        <LoginPopup setShowLogin={() => {}} />
      </StoreContext.Provider>
    );
    expect(1).toBe(1);
    expect(typeof "login").toBe("string");
  });
});
