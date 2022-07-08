import { render } from '@testing-library/react';

import { AddInventory } from './AddInventory';

describe('AddInventory', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<AddInventory />);
    expect(baseElement).toBeTruthy();
  });
});
