import { render } from '@testing-library/react';

import TellerTransferDetailPage from './TellerTransferDetailPage';

describe('TellerTransferDetailPage.spec', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<TellerTransferDetailPage />);
    expect(baseElement).toBeTruthy();
  });
});
