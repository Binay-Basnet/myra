import { render } from '@testing-library/react';

import EbankingFeatureCoop from './ebankingFeatureCoop';

describe('EbankingFeatureCoop', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<EbankingFeatureCoop />);
    expect(baseElement).toBeTruthy();
  });
});
