import { render } from '@testing-library/react';

import MyraUtil from './myra-util';

describe('MyraUtil', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<MyraUtil />);
    expect(baseElement).toBeTruthy();
  });
});
