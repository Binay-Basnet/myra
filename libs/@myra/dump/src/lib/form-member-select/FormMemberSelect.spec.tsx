import { render } from '@testing-library/react';

import FormMemberSelect from './FormMemberSelect';

describe('FormMemberSelect', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<FormMemberSelect />);
    expect(baseElement).toBeTruthy();
  });
});
