import { render } from '@testing-library/react';

import TableAmountFilter from './TableAmountFilter';

describe('TableAmountFilter', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<TableAmountFilter />);
    expect(baseElement).toBeTruthy();
  });
});
