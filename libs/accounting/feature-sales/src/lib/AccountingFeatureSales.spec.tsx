import { render } from '@testing-library/react';

import AccountingFeatureSales from './AccountingFeatureSales';

describe('AccountingFeatureSales', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<AccountingFeatureSales />);
    expect(baseElement).toBeTruthy();
  });
});
