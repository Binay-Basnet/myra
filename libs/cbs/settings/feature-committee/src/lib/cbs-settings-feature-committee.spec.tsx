import { render } from '@testing-library/react';

import CbsSettingsFeatureCommittee from './cbs-settings-feature-committee';

describe('CbsSettingsFeatureCommittee', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<CbsSettingsFeatureCommittee />);
    expect(baseElement).toBeTruthy();
  });
});
