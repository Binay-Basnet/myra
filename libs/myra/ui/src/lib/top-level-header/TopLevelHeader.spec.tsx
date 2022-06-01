import { render } from '@testing-library/react';

import TopLevelHeader from './TopLevelHeader';

describe('TopLevelHeader', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<TopLevelHeader />);
    expect(baseElement).toBeTruthy();
  });
});
