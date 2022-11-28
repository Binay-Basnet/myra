import { render } from '@testing-library/react';

import ModalHeader from './ModalHeader';

describe('ModalHeader', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<ModalHeader />);
    expect(baseElement).toBeTruthy();
  });
});
