import { render } from '@testing-library/react';

import CbsSettingsFeatureMember from './cbs-settings-feature-member';

describe('CbsSettingsFeatureMember', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<CbsSettingsFeatureMember />);
    expect(baseElement).toBeTruthy();
  });
});
