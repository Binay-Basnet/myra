import { RouterContext } from 'next/dist/shared/lib/router-context';
import { render } from '@testing-library/react';

import PageHeaderTab from './PageHeaderTab';
import { createMockRouter } from '../table-search/TableSearch.spec';

describe('PageHeaderTab', () => {
  it('should render successfully', () => {
    const { baseElement } = render(
      <RouterContext.Provider value={createMockRouter({ query: { id: '22' } })}>
        <PageHeaderTab list={[{ key: '13', title: '134' }]} />{' '}
      </RouterContext.Provider>
    );
    expect(baseElement).toBeTruthy();
  });
});
