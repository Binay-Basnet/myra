import { render } from '@testing-library/react';

import PageHeaderTab from './PageHeaderTab';

describe('PageHeaderTab', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<PageHeaderTab />);
    expect(baseElement).toBeTruthy();
  });
});
