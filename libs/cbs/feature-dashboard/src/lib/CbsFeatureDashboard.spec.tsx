import { render } from '@testing-library/react';

import CbsFeatureDashboard from './CbsFeatureDashboard';

describe('CbsFeatureDashboard', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<CbsFeatureDashboard />);
    expect(baseElement).toBeTruthy();
  });
});
