import { render } from '@testing-library/react';

import TableSearch from './TableSearch';

describe('TableSearch', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<TableSearch />);
    expect(baseElement).toBeTruthy();
  });
});
