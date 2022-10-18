import { render } from '@testing-library/react';

import FormBranchSelect from './FormBranchSelect';

describe('FormBranchSelect', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<FormBranchSelect />);
    expect(baseElement).toBeTruthy();
  });
});
