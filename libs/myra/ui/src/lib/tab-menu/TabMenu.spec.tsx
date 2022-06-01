import { render } from '@testing-library/react';

import TabMenu from './TabMenu';

describe('TabMenu', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<TabMenu />);
    expect(baseElement).toBeTruthy();
  });
});
