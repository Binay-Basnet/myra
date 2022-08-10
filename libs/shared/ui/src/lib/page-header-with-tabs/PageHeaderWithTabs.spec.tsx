import { render } from '@testing-library/react';

import PageHeaderWithTabs from './PageHeaderWithTabs';

describe('PageHeaderWithTabs', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<PageHeaderWithTabs />);
    expect(baseElement).toBeTruthy();
  });
});
