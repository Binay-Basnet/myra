import { render } from '@testing-library/react';

import EmployeePortalUiLayouts from './employee-portal-ui-layouts';

describe('EmployeePortalUiLayouts', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<EmployeePortalUiLayouts />);
    expect(baseElement).toBeTruthy();
  });
});
