import { render } from '@testing-library/react';

import MemberCard from './MemberCard';

describe('MemberCard', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<MemberCard />);
    expect(baseElement).toBeTruthy();
  });
});
