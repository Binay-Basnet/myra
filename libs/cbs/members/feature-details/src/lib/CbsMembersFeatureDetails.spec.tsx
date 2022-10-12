import { render } from '@testing-library/react';

import CbsMembersFeatureDetails from './CbsMembersFeatureDetails';

describe('CbsMembersFeatureDetails', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<CbsMembersFeatureDetails />);
    expect(baseElement).toBeTruthy();
  });
});
