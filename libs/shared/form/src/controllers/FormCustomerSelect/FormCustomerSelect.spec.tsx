import { render } from '@testing-library/react';

import FormCustomerSelect from './FormCustomerSelect';

describe('FormCustomerSelect', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<FormCustomerSelect />);
    expect(baseElement).toBeTruthy();
  });
});
