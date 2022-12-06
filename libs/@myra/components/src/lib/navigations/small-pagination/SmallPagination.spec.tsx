import { RouterContext } from 'next/dist/shared/lib/router-context';
import { render } from '@testing-library/react';

import SmallPagination from './SmallPagination';
import { createMockRouter } from '../table-search/TableSearch.spec';

describe('SmallPagination', () => {
  it('should render successfully', () => {
    const { baseElement } = render(
      <RouterContext.Provider value={createMockRouter({ query: { id: '22' } })}>
        <SmallPagination limit={13} total={131} startCursor="13" endCursor="321" />{' '}
      </RouterContext.Provider>
    );
    expect(baseElement).toBeTruthy();
  });
});
