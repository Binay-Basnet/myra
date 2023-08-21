import { render } from '@testing-library/react';

import EbankingFeatureUtilityPayment from './EbankingFeatureUtilityPayment';

describe('EbankingFeatureUtilityPayment', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<EbankingFeatureUtilityPayment />);
    expect(baseElement).toBeTruthy();
  });
});
