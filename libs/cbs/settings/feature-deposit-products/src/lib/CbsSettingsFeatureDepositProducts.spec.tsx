import { render } from '@testing-library/react';

import CbsSettingsFeatureDepositProducts from './CbsSettingsFeatureDepositProducts';

describe('CbsSettingsFeatureDepositProducts', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<CbsSettingsFeatureDepositProducts />);
    expect(baseElement).toBeTruthy();
  });
});
