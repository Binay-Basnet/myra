import { render } from '@testing-library/react';

import FormPhoneNumber from './FormPhoneNumber';

describe('FormPhoneNumber', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<FormPhoneNumber />);
    expect(baseElement).toBeTruthy();
  });
});
