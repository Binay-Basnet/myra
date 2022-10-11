import { render } from '@testing-library/react';

import EbankingFeatureAuth from './EbankingFeatureAuth';

describe('EbankingFeatureAuth', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<EbankingFeatureAuth />);
    expect(baseElement).toBeTruthy();
  });
});
