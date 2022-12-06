import { render } from '@testing-library/react';

import PopOverComponentForButtonList from './PopOverComponentForButtonList';

describe('PopOverComponentForButtonList', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<PopOverComponentForButtonList buttonLabel="Hello" />);
    expect(baseElement).toBeTruthy();
  });
});
