import { render } from '@testing-library/react';

import MyraUi from './myra-ui';

describe('MyraUi', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<MyraUi />);
    expect(baseElement).toBeTruthy();
  });
});
