import { render } from '@testing-library/react';

import EbankingFeatureProducts from './EbankingFeatureProducts';

describe('EbankingFeatureProducts', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<EbankingFeatureProducts />);
    expect(baseElement).toBeTruthy();
  });
});
