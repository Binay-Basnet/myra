import { render } from '@testing-library/react';

import ChangePasswordLayout from './ChangePasswordLayout';

describe('ChangePasswordLayout', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<ChangePasswordLayout />);
    expect(baseElement).toBeTruthy();
  });
});
