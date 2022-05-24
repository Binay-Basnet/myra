import { render } from '@testing-library/react';

import Chips from './Chips';

describe('Chips', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<Chips />);
    expect(baseElement).toBeTruthy();
  });
});
