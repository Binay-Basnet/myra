import { render } from '@testing-library/react';

import DetailCardStats from './DetailCardStats';

describe('DetailCardStats', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<DetailCardStats />);
    expect(baseElement).toBeTruthy();
  });
});
