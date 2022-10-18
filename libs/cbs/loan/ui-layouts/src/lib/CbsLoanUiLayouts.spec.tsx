import { render } from '@testing-library/react';

import LoanLayout from './LoanLayout';

describe('LoanLayout', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<LoanLayout />);
    expect(baseElement).toBeTruthy();
  });
});
