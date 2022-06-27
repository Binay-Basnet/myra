import { render } from '@testing-library/react';

import FormAccountInput from './FormAccountInput';

describe('FormAccountInput', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<FormAccountInput />);
    expect(baseElement).toBeTruthy();
  });
});
