import { render } from '@testing-library/react';

import CbsSettingsFeatureBranches from './cbs-settings-feature-branches';

describe('CbsSettingsFeatureBranches', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<CbsSettingsFeatureBranches />);
    expect(baseElement).toBeTruthy();
  });
});
