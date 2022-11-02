import { render } from '@testing-library/react';

import DetailPageQuickLinks from './DetailPageQuickLinks';

describe('DetailPageQuickLinks', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<DetailPageQuickLinks />);
    expect(baseElement).toBeTruthy();
  });
});
