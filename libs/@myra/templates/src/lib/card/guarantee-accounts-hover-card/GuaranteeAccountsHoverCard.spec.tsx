import { render } from '@testing-library/react';

import GuaranteeAccountsHoverCard from './GuaranteeAccountsHoverCard';

describe('GuaranteeAccountsHoverCard', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<GuaranteeAccountsHoverCard />);
    expect(baseElement).toBeTruthy();
  });
});
