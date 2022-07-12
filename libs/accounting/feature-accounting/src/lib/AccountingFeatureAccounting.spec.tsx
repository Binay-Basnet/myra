import { render } from '@testing-library/react';

import AccountingFeatureAccounting from './AccountingFeatureAccounting';

describe('AccountingFeatureAccounting', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<AccountingFeatureAccounting />);
    expect(baseElement).toBeTruthy();
  });
});
