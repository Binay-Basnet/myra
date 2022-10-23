import { render } from '@testing-library/react';

import CbsRequestsFeatureLists from './CbsRequestsFeatureLists';

describe('CbsRequestsFeatureLists', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<CbsRequestsFeatureLists />);
    expect(baseElement).toBeTruthy();
  });
});
