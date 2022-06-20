import { render } from '@testing-library/react';

import FormEmailInput from './FormEmailInput';

describe('FormEmailInput', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<FormEmailInput />);
    expect(baseElement).toBeTruthy();
  });
});
