import { render } from '@testing-library/react';

import Button from './Button';

describe('Button', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<Button colorScheme={''} size={'xl'} >Button</Button>);
    expect(baseElement).toBeTruthy();
  });
});
