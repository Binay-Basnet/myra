import { render } from '@testing-library/react';

import CbsReportsFeatureLists from './cbs-reports-feature-lists';

describe('CbsReportsFeatureLists', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<CbsReportsFeatureLists />);
    expect(baseElement).toBeTruthy();
  });
});
