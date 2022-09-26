import { render } from '@testing-library/react';

import LoanList from './LoanList';

describe('LoanList', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<LoanList />);
    expect(baseElement).toBeTruthy();
  });
});
