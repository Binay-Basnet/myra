import { RouterContext } from 'next/dist/shared/lib/router-context';
import { render } from '@testing-library/react';

import MainLayoutInventory from './MainLayoutInventory';
import { createMockRouter } from '../table-search/TableSearch.spec';

describe('MainLayoutInventory', () => {
  it('should render successfully', () => {
    const { baseElement } = render(
      <RouterContext.Provider value={createMockRouter({ query: { id: '22' } })}>
        <MainLayoutInventory children={'Hello'} />
      </RouterContext.Provider>
    );
    expect(baseElement).toBeTruthy();
  });
});
