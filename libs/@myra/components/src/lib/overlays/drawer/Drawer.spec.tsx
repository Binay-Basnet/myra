import { useDisclosure } from '@chakra-ui/react';
import { render } from '@testing-library/react';

import Drawer from './Drawer';

describe('Drawer', () => {
  const { onClose, isOpen } = useDisclosure();
  it('should render successfully', () => {
    const { baseElement } = render(
      <Drawer open={isOpen} onClose={onClose}>
        {' '}
        <p>test</p>{' '}
      </Drawer>
    );
    expect(baseElement).toBeTruthy();
  });
});
