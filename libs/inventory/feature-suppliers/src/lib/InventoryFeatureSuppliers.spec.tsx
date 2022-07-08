import { render } from '@testing-library/react';

import { InventoryFeatureSuppliers } from './InventoryFeatureSuppliers';

describe('InventoryFeatureSuppliers', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<InventoryFeatureSuppliers />);
    expect(baseElement).toBeTruthy();
  });
});
