import { render } from '@testing-library/react';

import ShareMemberCard from './ShareMemberCard';

describe('ShareMemberCard', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<ShareMemberCard />);
    expect(baseElement).toBeTruthy();
  });
});
