import { render } from '@testing-library/react';

import { InventoryFeatureRegister } from './InventoryFeatureRegister';

describe('InventoryFeatureInventory', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<InventoryFeatureRegister />);
    expect(baseElement).toBeTruthy();
  });
});
