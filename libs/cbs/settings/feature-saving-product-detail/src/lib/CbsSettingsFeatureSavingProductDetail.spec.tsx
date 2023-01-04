import { render } from '@testing-library/react';

import { CbsSettingsSavingsDetailPage } from './CbsSettingsSavingsDetailPage';

describe('CbsSettingsFeatureSavingProductDetail', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<CbsSettingsSavingsDetailPage />);
    expect(baseElement).toBeTruthy();
  });
});
