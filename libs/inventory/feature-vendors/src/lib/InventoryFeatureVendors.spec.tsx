import { render } from '@testing-library/react';

import InventoryFeatureVendors from './InventoryFeatureVendors';

describe('InventoryFeatureVendors', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<InventoryFeatureVendors />);
    expect(baseElement).toBeTruthy();
  });
});
