import { render } from '@testing-library/react';

import CbsShareFeaturesSharePurchase from './CbsShareFeaturesSharePurchase';

describe('CbsShareFeaturesSharePurchase', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<CbsShareFeaturesSharePurchase />);
    expect(baseElement).toBeTruthy();
  });
});
