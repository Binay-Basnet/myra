import { render } from '@testing-library/react';

import CbsSettingsFeatureAccounting from './CbsSettingsFeatureAccounting';

describe('CbsSettingsFeatureAccounting', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<CbsSettingsFeatureAccounting />);
    expect(baseElement).toBeTruthy();
  });
});
