import { render } from '@testing-library/react';

import ChakraTable from './ChakraTable';

describe('ChakraTable', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<ChakraTable />);
    expect(baseElement).toBeTruthy();
  });
});
