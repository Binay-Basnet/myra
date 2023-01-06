import { render } from '@testing-library/react';

import CbsSettingsFeatureBank from './CbsSettingsFeatureBank';

describe('CbsSettingsFeatureBank', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<CbsSettingsFeatureBank />);
    expect(baseElement).toBeTruthy();
  });
});
