import { render } from '@testing-library/react';

import HrModuleFeatureLifecycle from './HrModuleFeatureLifecycle';

describe('HrModuleFeatureLifecycle', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<HrModuleFeatureLifecycle />);
    expect(baseElement).toBeTruthy();
  });
});
