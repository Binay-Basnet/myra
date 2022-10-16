import { render } from '@testing-library/react';

import AlternativeChannels from './AlternativeChannels';

describe('CbsSettingsFeatureAlternativeChannels', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<AlternativeChannels />);
    expect(baseElement).toBeTruthy();
  });
});
