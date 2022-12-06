import { render } from '@testing-library/react';

import PhoneNumberInput from './PhoneNumberInput';

describe('PhoneNumberInput', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<PhoneNumberInput />);
    expect(baseElement).toBeTruthy();
  });
});
