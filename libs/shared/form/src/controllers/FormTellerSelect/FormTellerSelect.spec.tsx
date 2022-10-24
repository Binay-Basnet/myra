import { render } from '@testing-library/react';

import FormTellerSelect from './FormTellerSelect';

describe('FormTellerSelect', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<FormTellerSelect />);
    expect(baseElement).toBeTruthy();
  });
});
