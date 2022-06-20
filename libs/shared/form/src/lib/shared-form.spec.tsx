import { render } from '@testing-library/react';

import SharedForm from './shared-form';

describe('SharedForm', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<SharedForm />);
    expect(baseElement).toBeTruthy();
  });
});
