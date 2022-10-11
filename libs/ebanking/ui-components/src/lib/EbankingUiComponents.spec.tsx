import { render } from '@testing-library/react';

import EbankingUiComponents from './EbankingUiComponents';

describe('EbankingUiComponents', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<EbankingUiComponents />);
    expect(baseElement).toBeTruthy();
  });
});
