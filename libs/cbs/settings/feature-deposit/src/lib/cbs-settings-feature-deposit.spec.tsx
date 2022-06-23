import { render } from '@testing-library/react';

import CbsSettingsFeatureDeposit from './cbs-settings-feature-deposit';

describe('CbsSettingsFeatureDeposit', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<CbsSettingsFeatureDeposit />);
    expect(baseElement).toBeTruthy();
  });
});
