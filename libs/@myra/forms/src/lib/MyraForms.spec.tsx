import { render } from '@testing-library/react';

import MyraForms from './MyraForms';

describe('MyraForms', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<MyraForms />);
    expect(baseElement).toBeTruthy();
  });
});
