import { render } from '@testing-library/react';

import MemberHoverCard from './MemberHoverCard';

describe('MemberHoverCard', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<MemberHoverCard />);
    expect(baseElement).toBeTruthy();
  });
});
