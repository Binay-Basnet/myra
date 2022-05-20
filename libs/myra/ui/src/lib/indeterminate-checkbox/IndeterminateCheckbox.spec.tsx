import { render } from '@testing-library/react';

import IndeterminateCheckbox from './IndeterminateCheckbox';

describe('IndeterminateCheckbox', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<IndeterminateCheckbox />);
    expect(baseElement).toBeTruthy();
  });
});
