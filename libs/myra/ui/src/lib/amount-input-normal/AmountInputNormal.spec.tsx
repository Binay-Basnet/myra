import { render } from '@testing-library/react';

import AmountInputNormal from './AmountInputNormal';

describe('AmountInputNormal', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<AmountInputNormal />);
    expect(baseElement).toBeTruthy();
  });
});
