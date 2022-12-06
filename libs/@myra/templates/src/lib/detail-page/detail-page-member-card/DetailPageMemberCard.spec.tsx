import { render } from '@testing-library/react';

import DetailPageMemberCard from './DetailPageMemberCard';

describe('DetailPageMemberCard', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<DetailPageMemberCard />);
    expect(baseElement).toBeTruthy();
  });
});
