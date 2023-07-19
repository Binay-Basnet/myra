import { render } from '@testing-library/react';

import EmployeePortalFeatureAttendance from './employee-portal-feature-attendance';

describe('EmployeePortalFeatureAttendance', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<EmployeePortalFeatureAttendance />);
    expect(baseElement).toBeTruthy();
  });
});
