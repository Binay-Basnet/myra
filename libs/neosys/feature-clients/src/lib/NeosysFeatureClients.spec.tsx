import { render } from '@testing-library/react';

import NeosysFeatureClients from './NeosysFeatureClients';

describe('NeosysFeatureClients', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<NeosysFeatureClients />);
    expect(baseElement).toBeTruthy();
  });
});
