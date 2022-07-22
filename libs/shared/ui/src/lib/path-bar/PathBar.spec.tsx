import { render } from '@testing-library/react';

import PathBar from './PathBar';

describe('PathBar', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<PathBar />);
    expect(baseElement).toBeTruthy();
  });
});
