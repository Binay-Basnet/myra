import { render } from '@testing-library/react';

import KYMCooperativeUnionPage from './KymCooperativeUnionPage';

describe('KYMCooperativeUnionPage', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<KYMCooperativeUnionPage />);
    expect(baseElement).toBeTruthy();
  });
});
