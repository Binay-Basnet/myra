import { render } from '@testing-library/react';

import { InventoryFeatureAdjustment } from './InventoryFeatureAdjustment';

describe('InventoryFeatureAdjustment', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<InventoryFeatureAdjustment />);
    expect(baseElement).toBeTruthy();
  });
});
