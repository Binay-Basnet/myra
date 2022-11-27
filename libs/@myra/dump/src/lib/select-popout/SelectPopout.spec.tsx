import { render } from '@testing-library/react';

import SelectPopout from './SelectPopout';

describe('SelectPopout', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<SelectPopout />);
    expect(baseElement).toBeTruthy();
  });
});
