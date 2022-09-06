import { render } from '@testing-library/react';

import FormAccountSelect from './FormAccountSelecttest';

describe('FormAccountSelect', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<FormAccountSelect />);
    expect(baseElement).toBeTruthy();
  });
});
