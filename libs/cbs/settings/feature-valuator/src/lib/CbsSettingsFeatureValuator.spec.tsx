import { render } from '@testing-library/react';

import CbsSettingsFeatureValuator from './CbsSettingsFeatureValuator';

describe('CbsSettingsFeatureValuator', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<CbsSettingsFeatureValuator />);
    expect(baseElement).toBeTruthy();
  });
});
