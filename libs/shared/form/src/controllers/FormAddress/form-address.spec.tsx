import { render } from '@testing-library/react';

import FormAddress from './FormAddress';

describe('FormAddress', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<FormAddress />);
    expect(baseElement).toBeTruthy();
  });
});
