import { render } from '@testing-library/react';

import ShortcutTab from './ShortcutTab';

describe('ShorcutTab', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<ShortcutTab shortcut="Ctrl" />);
    expect(baseElement).toBeTruthy();
  });
});
