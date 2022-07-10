import { render } from '@testing-library/react';

import CbsMembersFeatureList from './MemberListPage';

describe('CbsMembersFeatureList', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<CbsMembersFeatureList />);
    expect(baseElement).toBeTruthy();
  });
});
