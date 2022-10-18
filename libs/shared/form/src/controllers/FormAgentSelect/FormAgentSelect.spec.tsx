import { render } from '@testing-library/react';

import FormAgentSelect from './FormAgentSelect';

describe('FormAgentSelect', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<FormAgentSelect />);
    expect(baseElement).toBeTruthy();
  });
});
