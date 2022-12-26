import { render } from '@testing-library/react';

import SuccessCard from './SuccessCard';

describe('SuccessCard', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<SuccessCard />);
    expect(baseElement).toBeTruthy();
  });
});
