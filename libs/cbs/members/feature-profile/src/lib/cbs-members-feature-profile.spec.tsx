import { render } from '@testing-library/react';

import CbsMembersFeatureProfile from './cbs-members-feature-profile';

describe('CbsMembersFeatureProfile', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<CbsMembersFeatureProfile />);
    expect(baseElement).toBeTruthy();
  });
});
