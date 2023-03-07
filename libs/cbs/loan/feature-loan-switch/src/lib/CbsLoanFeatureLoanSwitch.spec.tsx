import { render } from '@testing-library/react';

import CbsLoanFeatureLoanSwitch from './CbsLoanFeatureLoanSwitch';

describe('CbsLoanFeatureLoanSwitch', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<CbsLoanFeatureLoanSwitch />);
    expect(baseElement).toBeTruthy();
  });
});
