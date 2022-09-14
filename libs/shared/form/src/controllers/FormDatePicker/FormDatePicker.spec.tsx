import { render } from '@testing-library/react';

import FormDatePicker from './FormDatePicker';

describe('FormDatePicker', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<FormDatePicker />);
    expect(baseElement).toBeTruthy();
  });
});
