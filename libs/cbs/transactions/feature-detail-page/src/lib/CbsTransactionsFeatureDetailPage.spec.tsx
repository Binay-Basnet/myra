import { render } from '@testing-library/react';

import WithdrawDetailPage from './WithdrawDetailPage';

describe('WithdrawDetailPage', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<WithdrawDetailPage />);
    expect(baseElement).toBeTruthy();
  });
});
