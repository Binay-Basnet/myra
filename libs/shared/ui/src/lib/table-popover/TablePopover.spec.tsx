import { render } from '@testing-library/react';

import TablePopover from './TablePopover';

describe('TablePopover', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<TablePopover />);
    expect(baseElement).toBeTruthy();
  });
});
