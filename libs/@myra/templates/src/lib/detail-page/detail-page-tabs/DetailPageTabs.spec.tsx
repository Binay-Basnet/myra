import { render } from '@testing-library/react';

import DetailPageTabs from './DetailPageTabs';

describe('DetailPageTabs', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<DetailPageTabs />);
    expect(baseElement).toBeTruthy();
  });
});
