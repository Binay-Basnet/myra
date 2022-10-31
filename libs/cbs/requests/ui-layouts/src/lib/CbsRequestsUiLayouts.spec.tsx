import { render } from '@testing-library/react';

import RequestListLayout from './RequestListLayout';

describe('RequestListLayout', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<RequestListLayout />);
    expect(baseElement).toBeTruthy();
  });
});
