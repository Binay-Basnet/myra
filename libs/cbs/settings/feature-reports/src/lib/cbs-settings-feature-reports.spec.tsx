import { render } from '@testing-library/react';

import CbsSettingsFeatureReports from './cbs-settings-feature-reports';

describe('CbsSettingsFeatureReports', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<CbsSettingsFeatureReports />);
    expect(baseElement).toBeTruthy();
  });
});
