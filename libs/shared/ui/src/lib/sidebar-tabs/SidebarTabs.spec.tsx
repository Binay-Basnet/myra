import { render } from '@testing-library/react';

import SidebarTabs from './SidebarTabs';

describe('SidebarTabs', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<SidebarTabs />);
    expect(baseElement).toBeTruthy();
  });
});
