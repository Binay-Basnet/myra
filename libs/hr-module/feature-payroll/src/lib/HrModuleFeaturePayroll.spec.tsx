import { render } from '@testing-library/react';

import HrModuleFeaturePayroll from './HrModuleFeaturePayroll';

describe('HrModuleFeaturePayroll', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<HrModuleFeaturePayroll />);
    expect(baseElement).toBeTruthy();
  });
});
