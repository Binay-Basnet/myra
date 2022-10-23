import { render } from '@testing-library/react';

import CbsRequestsUiLayouts from './CbsRequestsUiLayouts';

describe('CbsRequestsUiLayouts', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<CbsRequestsUiLayouts />);
    expect(baseElement).toBeTruthy();
  });
});
