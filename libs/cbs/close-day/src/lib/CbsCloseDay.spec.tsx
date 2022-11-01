import { render } from '@testing-library/react';

import CbsCloseDay from './CbsCloseDay';

describe('CbsCloseDay', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<CbsCloseDay />);
    expect(baseElement).toBeTruthy();
  });
});
