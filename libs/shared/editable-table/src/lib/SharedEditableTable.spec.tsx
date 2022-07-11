import { render } from '@testing-library/react';

import SharedEditableTable from './SharedEditableTable';

describe('SharedEditableTable', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<SharedEditableTable />);
    expect(baseElement).toBeTruthy();
  });
});
