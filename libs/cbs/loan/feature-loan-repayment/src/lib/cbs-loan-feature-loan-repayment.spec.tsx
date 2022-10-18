import { render } from '@testing-library/react';

import CbsLoanFeatureLoanRepayment from './cbs-loan-feature-loan-repayment';

describe('CbsLoanFeatureLoanRepayment', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<CbsLoanFeatureLoanRepayment />);
    expect(baseElement).toBeTruthy();
  });
});
