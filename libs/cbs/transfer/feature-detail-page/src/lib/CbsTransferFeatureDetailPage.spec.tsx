import { render } from '@testing-library/react';

import CbsTransferFeatureDetailPage from './CbsTransferFeatureDetailPage';

describe('CbsTransferFeatureDetailPage', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<CbsTransferFeatureDetailPage />);
    expect(baseElement).toBeTruthy();
  });
});
