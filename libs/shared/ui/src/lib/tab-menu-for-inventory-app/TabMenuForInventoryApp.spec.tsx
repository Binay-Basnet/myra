import { RouterContext } from 'next/dist/shared/lib/router-context';
import { render } from '@testing-library/react';

import TabMenuForInventoryApp from './TabMenuForInventoryApp';
import { createMockRouter } from '../table-search/TableSearch.spec';

describe('TabMenuForInventoryApp', () => {
  it('should render successfully', () => {
    const { baseElement } = render(
      <RouterContext.Provider value={createMockRouter({ query: { id: '22' } })}>
        <TabMenuForInventoryApp />
      </RouterContext.Provider>
    );
    expect(baseElement).toBeTruthy();
  });
});
