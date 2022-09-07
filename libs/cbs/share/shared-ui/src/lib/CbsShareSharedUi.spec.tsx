import { render } from '@testing-library/react';

import ShareAccountProps from './ShareAccount';

describe('ShareAccountProps', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<ShareAccountProps />);
    expect(baseElement).toBeTruthy();
  });
});
