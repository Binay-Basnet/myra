import { render } from '@testing-library/react';

import NeosysFeatureSettings from './NeosysFeatureSettings';

describe('NeosysFeatureSettings', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<NeosysFeatureSettings />);
    expect(baseElement).toBeTruthy();
  });
});
