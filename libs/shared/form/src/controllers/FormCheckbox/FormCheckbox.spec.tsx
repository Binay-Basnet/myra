import { render } from '@testing-library/react';

import FormCheckbox from './FormCheckbox';

describe('FormCheckbox', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<FormCheckbox name="test" />);
    expect(baseElement).toBeTruthy();
  });
});
