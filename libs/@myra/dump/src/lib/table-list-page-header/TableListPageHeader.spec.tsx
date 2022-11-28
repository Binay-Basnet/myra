import { render } from '@testing-library/react';

import TableListPageHeader from './TableListPageHeader';

describe('TableListPageHeader', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<TableListPageHeader />);
    expect(baseElement).toBeTruthy();
  });
});
