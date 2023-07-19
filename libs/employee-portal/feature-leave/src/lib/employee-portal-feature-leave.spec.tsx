import { render } from '@testing-library/react';

import EmployeePortalFeatureLeave from './employee-portal-feature-leave';

describe('EmployeePortalFeatureLeave', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<EmployeePortalFeatureLeave />);
    expect(baseElement).toBeTruthy();
  });
});
