import { render } from '@testing-library/react';

import EmployeePortalDataAccess from './employee-portal-data-access';

describe('EmployeePortalDataAccess', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<EmployeePortalDataAccess />);
    expect(baseElement).toBeTruthy();
  });
});
