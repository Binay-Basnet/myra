import { render } from '@testing-library/react';

import FormBankSelect from './FormBankSelect';

describe('FormBankSelect', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<FormBankSelect />);
    expect(baseElement).toBeTruthy();
  });
});
