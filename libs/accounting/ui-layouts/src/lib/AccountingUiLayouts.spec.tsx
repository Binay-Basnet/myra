import { render } from '@testing-library/react';

import AccountingUiLayouts from './AccountingUiLayouts';

describe('AccountingUiLayouts', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<AccountingUiLayouts />);
    expect(baseElement).toBeTruthy();
  });
});
