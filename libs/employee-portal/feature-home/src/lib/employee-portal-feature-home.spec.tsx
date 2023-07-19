import { render } from '@testing-library/react';

import EmployeePortalFeatureHome from './employee-portal-feature-home';

describe('EmployeePortalFeatureHome', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<EmployeePortalFeatureHome />);
    expect(baseElement).toBeTruthy();
  });
});
