import { RouterContext } from 'next/dist/shared/lib/router-context';
import { render } from '@testing-library/react';

import TabMenu from './TabMenu';
import { createMockRouter } from '../pagination/Pagination.spec';

describe('TabMenu', () => {
  it('should render successfully', () => {
    const { baseElement } = render(
      <RouterContext.Provider value={createMockRouter({ query: { id: '22' } })}>
        <TabMenu />{' '}
      </RouterContext.Provider>
    );
    expect(baseElement).toBeTruthy();
  });
});
