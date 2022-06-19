import { render } from '@testing-library/react';

import FormFileInput from './FormFileInput';

describe('FormFileInput', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<FormFileInput />);
    expect(baseElement).toBeTruthy();
  });
});
