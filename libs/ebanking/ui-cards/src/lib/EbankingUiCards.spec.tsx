import { render } from '@testing-library/react';

import EbankingUiCards from './EbankingUiCards';

describe('EbankingUiCards', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<EbankingUiCards />);
    expect(baseElement).toBeTruthy();
  });
});
