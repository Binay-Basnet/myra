import { render } from '@testing-library/react';

import ChakraList from './ChakraList';

describe('ChakraList', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<ChakraList />);
    expect(baseElement).toBeTruthy();
  });
});
