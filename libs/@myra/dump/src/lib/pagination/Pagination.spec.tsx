import { RouterContext } from 'next/dist/shared/lib/router-context';
import { render } from '@testing-library/react';

import Pagination from './Pagination';
import { createMockRouter } from '../table-search/TableSearch.spec';

describe('Pagination', () => {
  it('should render successfully', () => {
    const { baseElement } = render(
      <RouterContext.Provider value={createMockRouter({ query: { id: '22' } })}>
        <Pagination
          endCursor="3131"
          pageSizeOptions={[130, 39494, 13]}
          startCursor="3333"
          total={333}
        />
      </RouterContext.Provider>
    );
    expect(baseElement).toBeTruthy();
  });
});
