import { render } from '@testing-library/react';

import CbsSettingsFeatureLoanProducts from './CbsSettingsFeatureLoanProducts';

describe('CbsSettingsFeatureLoanProducts', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<CbsSettingsFeatureLoanProducts />);
    expect(baseElement).toBeTruthy();
  });
});
