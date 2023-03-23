import { render } from '@testing-library/react';

import CbsLoanFeatureLoanClose from './CbsLoanFeatureLoanClose';

describe('CbsLoanFeatureLoanClose', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<CbsLoanFeatureLoanClose />);
    expect(baseElement).toBeTruthy();
  });
});
