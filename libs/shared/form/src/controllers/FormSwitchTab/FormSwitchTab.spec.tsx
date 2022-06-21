import { render } from '@testing-library/react';

import FormSwitchTab from './FormSwitchTab';

describe('FormSwitchTab', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<FormSwitchTab />);
    expect(baseElement).toBeTruthy();
  });
});
