import React from 'react';
import { render } from '@testing-library/react';
import Home from 'apps/ebanking/pages/home';

describe('Home', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<Home />);
    expect(baseElement).toBeTruthy();
  });
});
