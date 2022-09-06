import React from 'react';
import { render } from '@testing-library/react';

import Temp from '../pages/temp';

describe('Temp', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<Temp />);
    expect(baseElement).toBeTruthy();
  });
});
