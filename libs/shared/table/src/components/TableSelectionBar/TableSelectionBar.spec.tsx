import { render } from '@testing-library/react';

import TableSelectionBar from './TableSelectionBar';

describe('TableSelectionBar', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<TableSelectionBar />);
    expect(baseElement).toBeTruthy();
  });
});
