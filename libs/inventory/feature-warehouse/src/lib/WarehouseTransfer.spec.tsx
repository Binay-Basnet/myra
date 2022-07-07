import { render } from '@testing-library/react';

import WarehouseTransfer from './WarehouseTransfer';

describe('WarehouseTransfer', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<WarehouseTransfer />);
    expect(baseElement).toBeTruthy();
  });
});
