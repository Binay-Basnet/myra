import { render } from '@testing-library/react';

import FormInvestmentAccountSelect from './FormInvestmentAccountSelect';

describe('FormInvestmentAccountSelect', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<FormInvestmentAccountSelect />);
    expect(baseElement).toBeTruthy();
  });
});
