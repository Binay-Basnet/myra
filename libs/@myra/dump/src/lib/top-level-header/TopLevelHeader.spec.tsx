import { RouterContext } from 'next/dist/shared/lib/router-context';
import { render } from '@testing-library/react';

import TopLevelHeader from './TopLevelHeader';
import { createMockRouter } from '../table-search/TableSearch.spec';

describe('TopLevelHeader', () => {
  it('should render successfully', () => {
    const { baseElement } = render(
      <RouterContext.Provider value={createMockRouter({ query: { id: '22' } })}>
        <TopLevelHeader />{' '}
      </RouterContext.Provider>
    );
    expect(baseElement).toBeTruthy();
  });
});
