import { render } from '@testing-library/react';

import TableCheckbox from './TableCheckbox';

describe('TableCheckbox', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<TableCheckbox />);
    expect(baseElement).toBeTruthy();
  });
});
