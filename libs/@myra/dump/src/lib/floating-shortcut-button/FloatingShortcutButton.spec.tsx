import { render } from '@testing-library/react';

import FloatingShortcutButton from './FloatingShortcutButton';

describe('FloatingShortcutButton', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<FloatingShortcutButton />);
    expect(baseElement).toBeTruthy();
  });
});
