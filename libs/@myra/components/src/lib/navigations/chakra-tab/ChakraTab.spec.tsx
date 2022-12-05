import { render } from '@testing-library/react';

import ChakraTab from './ChakraTab';

describe('ChakraTab', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<ChakraTab />);
    expect(baseElement).toBeTruthy();
  });
});
