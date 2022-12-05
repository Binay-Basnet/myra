import { render } from '@testing-library/react';

import CbsSettingsFeatureDocuments from './CbsSettingsFeatureDocuments';

describe('CbsSettingsFeatureDocuments', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<CbsSettingsFeatureDocuments />);
    expect(baseElement).toBeTruthy();
  });
});
