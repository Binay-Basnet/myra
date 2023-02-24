import { render } from '@testing-library/react';

import CbsSettingsFeatureAccessLog from './CbsSettingsFeatureAccessLog';

describe('CbsSettingsFeatureAccessLog', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<CbsSettingsFeatureAccessLog />);
    expect(baseElement).toBeTruthy();
  });
});
