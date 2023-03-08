import { render } from '@testing-library/react';

import CbsSettingsFeatureUserDetails from './CbsSettingsFeatureUserDetails';

describe('CbsSettingsFeatureUserDetails', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<CbsSettingsFeatureUserDetails />);
    expect(baseElement).toBeTruthy();
  });
});
