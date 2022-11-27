import { render } from '@testing-library/react';

import AccountQRModal from './AccountQRModal';

describe('AccountQRModal', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<AccountQRModal />);
    expect(baseElement).toBeTruthy();
  });
});
