import { render } from '@testing-library/react';

import CbsAccountOpen from './CbsAccountOpen';

describe('CbsAccountsFeatureAccountForm', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<CbsAccountOpen />);
    expect(baseElement).toBeTruthy();
  });
});
