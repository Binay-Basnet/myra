import { render } from '@testing-library/react';

import FormSelect from './FormSelect';

describe('FormSelect', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<FormSelect />);
    expect(baseElement).toBeTruthy();
  });
});
