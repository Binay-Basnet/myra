import { render } from '@testing-library/react';

import Navbarfordaashboard from './Navbarfordaashboard';

describe('Navbarfordaashboard', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<Navbarfordaashboard />);
    expect(baseElement).toBeTruthy();
  });
});
