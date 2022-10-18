import { render } from '@testing-library/react';

import FormAmountInput from './FormAmountInput';

describe('FormAmountInput', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<FormAmountInput />);
    expect(baseElement).toBeTruthy();
  });
});
