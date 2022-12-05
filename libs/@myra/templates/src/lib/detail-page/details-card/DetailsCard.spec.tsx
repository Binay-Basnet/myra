import { render } from '@testing-library/react';

import DetailsCard from './DetailsCard';

describe('DetailsCard', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<DetailsCard />);
    expect(baseElement).toBeTruthy();
  });
});
