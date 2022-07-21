import { render } from '@testing-library/react';

import EbankingAccountsPage from './EbankingAccountsPage';

describe('EbankingAccountsPage', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<EbankingAccountsPage />);
    expect(baseElement).toBeTruthy();
  });
});
