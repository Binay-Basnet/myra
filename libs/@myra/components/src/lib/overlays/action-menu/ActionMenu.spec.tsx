import { render } from '@testing-library/react';

import ActionMenu from './ActionMenu';

describe('ActionMenu', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<ActionMenu />);
    expect(baseElement).toBeTruthy();
  });
});
