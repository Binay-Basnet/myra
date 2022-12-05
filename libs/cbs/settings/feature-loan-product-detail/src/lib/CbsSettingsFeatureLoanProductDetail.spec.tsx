import { render } from '@testing-library/react';

import CbsSettingsFeatureLoanProductDetail from './CbsSettingsFeatureLoanProductDetail';

describe('CbsSettingsFeatureLoanProductDetail', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<CbsSettingsFeatureLoanProductDetail />);
    expect(baseElement).toBeTruthy();
  });
});
