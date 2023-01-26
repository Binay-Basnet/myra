import { render } from '@testing-library/react';

import CbsSettingsFeatureEod from './CbsSettingsFeatureEod';

describe('CbsSettingsFeatureEod', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<CbsSettingsFeatureEod />);
    expect(baseElement).toBeTruthy();
  });
});
