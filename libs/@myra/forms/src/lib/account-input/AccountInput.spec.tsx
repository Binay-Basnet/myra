import { render } from '@testing-library/react';

import AccountInput from './AccountInput';

describe('AccountInput', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<AccountInput />);
    expect(baseElement).toBeTruthy();
  });
});
