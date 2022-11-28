import { render } from '@testing-library/react';

import WIPState from './WIPState';

describe('WIPState', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<WIPState />);
    expect(baseElement).toBeTruthy();
  });
});
