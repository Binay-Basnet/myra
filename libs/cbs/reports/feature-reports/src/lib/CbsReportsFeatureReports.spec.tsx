import { render } from '@testing-library/react';

import CbsReportsFeatureReports from './CbsReportsFeatureReports';

describe('CbsReportsFeatureReports', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<CbsReportsFeatureReports />);
    expect(baseElement).toBeTruthy();
  });
});
