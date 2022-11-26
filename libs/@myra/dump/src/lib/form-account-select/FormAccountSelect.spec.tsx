import { render } from '@testing-library/react';

import { FormAccountSelect } from '@myra/dump';

describe('FormAccountSelect', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<FormAccountSelect memberId="1111" name="akash" />);
    expect(baseElement).toBeTruthy();
  });
});
