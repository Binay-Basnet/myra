import { render } from '@testing-library/react';

import ChakraModal from './ChakraModal';

describe('ChakraModal', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<ChakraModal />);
    expect(baseElement).toBeTruthy();
  });
});
