import { render } from '@testing-library/react';

import NeosysFeatureUsers from './NeosysFeatureUsers';

describe('NeosysFeatureUsers', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<NeosysFeatureUsers />);
    expect(baseElement).toBeTruthy();
  });
});
