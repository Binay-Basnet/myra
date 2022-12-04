import { render } from '@testing-library/react';

import Toast from './ToastComponent';

describe('Toast', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<Toast message="Toast" type="success" state="error" />);
    expect(baseElement).toBeTruthy();
  });
});
