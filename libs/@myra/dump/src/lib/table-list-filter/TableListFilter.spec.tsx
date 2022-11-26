import { render } from '@testing-library/react';

import TableListFilter from './TableListFilter';

describe('TableListFilter', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<TableListFilter />);
    expect(baseElement).toBeTruthy();
  });
});
