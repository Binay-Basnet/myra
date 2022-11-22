import { render } from '@testing-library/react';

import AccountingFeatureLoan from './ExternalLoans';

describe('AccountingFeatureLoan', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<AccountingFeatureLoan />);
    expect(baseElement).toBeTruthy();
  });
});
