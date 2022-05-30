import { render } from '@testing-library/react';

import EmailInput from './EmailInput';

describe('EmailInput', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<EmailInput />);
    expect(baseElement).toBeTruthy();
  });
});
