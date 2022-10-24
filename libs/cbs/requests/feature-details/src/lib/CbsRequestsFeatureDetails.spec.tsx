import { render } from '@testing-library/react';

import CbsRequestsFeatureDetails from './CbsRequestsFeatureDetails';

describe('CbsRequestsFeatureDetails', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<CbsRequestsFeatureDetails />);
    expect(baseElement).toBeTruthy();
  });
});
