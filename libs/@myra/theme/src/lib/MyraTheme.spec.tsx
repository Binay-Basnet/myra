import { render } from '@testing-library/react';

import MyraTheme from './MyraTheme';

describe('MyraTheme', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<MyraTheme />);
    expect(baseElement).toBeTruthy();
  });
});
