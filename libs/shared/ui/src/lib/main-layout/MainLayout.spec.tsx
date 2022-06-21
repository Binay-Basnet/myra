import { RouterContext } from 'next/dist/shared/lib/router-context';
import { render } from '@testing-library/react';

import MainLayout from './MainLayout';
import { createMockRouter } from '../table-search/TableSearch.spec';

describe('MainLayout', () => {
  it('should render successfully', () => {
    const { baseElement } = render(
      <RouterContext.Provider value={createMockRouter({ query: { id: '22' } })}>
        <MainLayout> Hello Test </MainLayout>{' '}
      </RouterContext.Provider>
    );
    expect(baseElement).toBeTruthy();
  });
});
