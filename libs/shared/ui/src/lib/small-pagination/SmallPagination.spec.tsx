import { render } from '@testing-library/react';

import SmallPagination from './SmallPagination';

describe('SmallPagination', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<SmallPagination />);
    expect(baseElement).toBeTruthy();
  });
});
