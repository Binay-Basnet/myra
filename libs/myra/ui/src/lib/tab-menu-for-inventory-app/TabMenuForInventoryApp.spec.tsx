import { render } from '@testing-library/react';

import TabMenuForInventoryApp from './TabMenuForInventoryApp';

describe('TabMenuForInventoryApp', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<TabMenuForInventoryApp />);
    expect(baseElement).toBeTruthy();
  });
});
