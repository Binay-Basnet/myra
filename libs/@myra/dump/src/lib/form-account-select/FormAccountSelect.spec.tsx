import { FormAccountSelect } from '@myra/dump';
import { render } from '@testing-library/react';

describe('FormAccountSelect', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<FormAccountSelect memberId="1111" name="akash" />);
    expect(baseElement).toBeTruthy();
  });
});
