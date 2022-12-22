import { render } from '@testing-library/react';

import CbsLoanFeatureLoanAccountDetail from './CbsLoanFeatureLoanAccountDetail';

describe('CbsLoanFeatureLoanAccountDetail', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<CbsLoanFeatureLoanAccountDetail />);
    expect(baseElement).toBeTruthy();
  });
});
