import { render } from '@testing-library/react';

import AccountingFeatureAccountingDetail from './AccountingFeatureAccountingDetail';

describe('AccountingFeatureAccountingDetail', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<AccountingFeatureAccountingDetail />);
    expect(baseElement).toBeTruthy();
  });
});
