import { render } from '@testing-library/react';

import MainLayoutInventory from './MainLayoutInventory';

describe('MainLayoutInventory', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<MainLayoutInventory />);
    expect(baseElement).toBeTruthy();
  });
});
