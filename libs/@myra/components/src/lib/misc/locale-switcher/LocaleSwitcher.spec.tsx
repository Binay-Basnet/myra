import { render } from '@testing-library/react';

import { LocaleSwitcher } from './LocaleSwitcher';

describe('LocaleSwitcher', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<LocaleSwitcher />);
    expect(baseElement).toBeTruthy();
  });
});
