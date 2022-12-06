import { render } from '@testing-library/react';

import CbsSettingsFeatureSavingProductDetail from './CbsSettingsFeatureSavingProductDetail';

describe('CbsSettingsFeatureSavingProductDetail', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<CbsSettingsFeatureSavingProductDetail />);
    expect(baseElement).toBeTruthy();
  });
});
