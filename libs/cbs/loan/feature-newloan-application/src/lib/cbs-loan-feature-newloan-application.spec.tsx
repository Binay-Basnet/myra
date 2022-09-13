import { render } from '@testing-library/react';

import CbsLoanFeatureNewloanApplication from './cbs-loan-feature-newloan-application';

describe('CbsLoanFeatureNewloanApplication', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<CbsLoanFeatureNewloanApplication />);
    expect(baseElement).toBeTruthy();
  });
});
