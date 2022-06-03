import { render } from '@testing-library/react';

import AmountInput from './AmountInput';

describe('AmountInput', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<AmountInput />);
    expect(baseElement).toBeTruthy();
  });
});
