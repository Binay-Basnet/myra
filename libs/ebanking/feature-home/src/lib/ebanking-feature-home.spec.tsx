import { render } from '@testing-library/react';
import EbankingHomePage from 'libs/ebanking/feature-home/src/lib/EbankingHomePage';

describe('EbankingHomePage', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<EbankingHomePage />);
    expect(baseElement).toBeTruthy();
  });
});
