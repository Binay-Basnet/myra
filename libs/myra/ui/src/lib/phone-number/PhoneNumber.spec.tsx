import { render } from '@testing-library/react';

import PhoneNumber from './PhoneNumber';

describe('PhoneNumber', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<PhoneNumber />);
    expect(baseElement).toBeTruthy();
  });
});
