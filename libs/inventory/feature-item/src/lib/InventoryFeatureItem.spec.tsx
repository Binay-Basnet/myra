import { render } from '@testing-library/react';

import InventoryFeatureItem from './InventoryFeatureItem';

describe('InventoryFeatureItem', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<InventoryFeatureItem />);
    expect(baseElement).toBeTruthy();
  });
});
