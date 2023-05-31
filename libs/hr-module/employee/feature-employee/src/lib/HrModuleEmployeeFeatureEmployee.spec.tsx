import { render } from '@testing-library/react';

import HrModuleEmployeeFeatureEmployee from './HrModuleEmployeeFeatureEmployee';

describe('HrModuleEmployeeFeatureEmployee', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<HrModuleEmployeeFeatureEmployee />);
    expect(baseElement).toBeTruthy();
  });
});
