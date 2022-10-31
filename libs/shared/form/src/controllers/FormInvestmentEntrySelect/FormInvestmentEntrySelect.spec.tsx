import { render } from '@testing-library/react';

import FormInvestmentEntrySelect from './FormInvestmentEntrySelect';

describe('FormInvestmentEntrySelect', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<FormInvestmentEntrySelect />);
    expect(baseElement).toBeTruthy();
  });
});
