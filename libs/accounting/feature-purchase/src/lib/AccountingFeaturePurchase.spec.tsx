import { render } from '@testing-library/react';

import AccountingFeaturePurchase from './AccountingFeaturePurchase';

describe('AccountingFeaturePurchase', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<AccountingFeaturePurchase />);
    expect(baseElement).toBeTruthy();
  });
});
