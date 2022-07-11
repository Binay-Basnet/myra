import { render } from '@testing-library/react';

import AccountingUiComponents from './AccountingUiComponents';

describe('AccountingUiComponents', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<AccountingUiComponents />);
    expect(baseElement).toBeTruthy();
  });
});
