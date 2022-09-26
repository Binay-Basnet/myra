import { render } from '@testing-library/react';

import CbsLoanFeatureDetails from './CbsLoanFeatureDetails';

describe('CbsLoanFeatureDetails', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<CbsLoanFeatureDetails />);
    expect(baseElement).toBeTruthy();
  });
});
