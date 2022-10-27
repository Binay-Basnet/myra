import { render } from '@testing-library/react';

import EbankingFeatureSettings from './EbankingFeatureSettings';

describe('EbankingFeatureSettings', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<EbankingFeatureSettings />);
    expect(baseElement).toBeTruthy();
  });
});
