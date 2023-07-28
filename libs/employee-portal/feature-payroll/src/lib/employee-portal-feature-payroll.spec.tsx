import { render } from '@testing-library/react';

import EmployeePortalFeaturePayroll from './employee-portal-feature-payroll';

describe('EmployeePortalFeaturePayroll', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<EmployeePortalFeaturePayroll />);
    expect(baseElement).toBeTruthy();
  });
});
