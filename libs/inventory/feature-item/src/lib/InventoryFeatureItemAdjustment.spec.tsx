import { render } from '@testing-library/react';

import { InventoryFeatureItemAdjustment } from './InventoryFeatureItemAdjustment';

describe('InventoryFeatureItemAdjustment', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<InventoryFeatureItemAdjustment />);
    expect(baseElement).toBeTruthy();
  });
});
