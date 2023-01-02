import { render } from '@testing-library/react';

import BankSelect from './BankSelect';

describe('BankSelect', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<BankSelect />);
    expect(baseElement).toBeTruthy();
  });
});
