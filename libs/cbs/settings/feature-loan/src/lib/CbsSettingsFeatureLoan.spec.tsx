import { render } from '@testing-library/react';

import { SettingsLoanProduct } from './CbsSettingsLoanProduct';

describe('CbsSettingsFeatureLoan', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<SettingsLoanProduct />);
    expect(baseElement).toBeTruthy();
  });
});
