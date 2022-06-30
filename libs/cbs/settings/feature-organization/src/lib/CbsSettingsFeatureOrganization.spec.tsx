import { render } from '@testing-library/react';

import CbsSettingsFeatureOrganization from './CbsSettingsFeatureOrganization';

describe('CbsSettingsFeatureOrganization', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<CbsSettingsFeatureOrganization />);
    expect(baseElement).toBeTruthy();
  });
});
