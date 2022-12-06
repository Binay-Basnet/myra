import { render } from '@testing-library/react';

import DetailPageContentCard from './DetailPageContentCard';

describe('DetailPageContentCard', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<DetailPageContentCard />);
    expect(baseElement).toBeTruthy();
  });
});
