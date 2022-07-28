import { render } from '@testing-library/react';

import CbsSettingsFeatureMembers from './CbsSettingsFeatureMembers';

describe('CbsSettingsFeatureMembers', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<CbsSettingsFeatureMembers />);
    expect(baseElement).toBeTruthy();
  });
});
