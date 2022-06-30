import { render } from '@testing-library/react';

import CbsSettingsFeatureLoan from './CbsSettingsFeatureLoan';

describe('CbsSettingsFeatureLoan', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<CbsSettingsFeatureLoan />);
    expect(baseElement).toBeTruthy();
  });
});
