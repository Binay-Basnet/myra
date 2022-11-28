import { render } from '@testing-library/react';

import CheckboxGroup from './CheckboxGroup';

describe('CheckboxGroup', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<CheckboxGroup />);
    expect(baseElement).toBeTruthy();
  });
});
