import { render } from '@testing-library/react';

import FormFooter from './FormFooter';

describe('FormFooter', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<FormFooter />);
    expect(baseElement).toBeTruthy();
  });
});
