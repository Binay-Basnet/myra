import { render } from '@testing-library/react';

import { InventoryPageHeader } from './InventoryPageHeader';

describe('InventoryPageHeader', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<InventoryPageHeader />);
    expect(baseElement).toBeTruthy();
  });
});
