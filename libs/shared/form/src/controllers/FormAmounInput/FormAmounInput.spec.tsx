import { render } from '@testing-library/react';

import FormAmounInput from './FormAmounInput';

describe('FormAmounInput', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<FormAmounInput />);
    expect(baseElement).toBeTruthy();
  });
});
