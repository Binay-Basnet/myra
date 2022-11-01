import { render } from '@testing-library/react';

import CbsMembersFeatureActivations from './CbsMembersFeatureActivations';

describe('CbsMembersFeatureActivations', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<CbsMembersFeatureActivations />);
    expect(baseElement).toBeTruthy();
  });
});
