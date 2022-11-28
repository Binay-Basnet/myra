import { render } from '@testing-library/react';

import MyraMyraUi from './MyraMyraUi';

describe('MyraMyraUi', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<MyraMyraUi />);
    expect(baseElement).toBeTruthy();
  });
});
