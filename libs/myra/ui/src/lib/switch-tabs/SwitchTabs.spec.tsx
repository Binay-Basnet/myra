import { render } from '@testing-library/react';

import SwitchTabs from './SwitchTabs';

describe('SwitchTabs', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<SwitchTabs />);
    expect(baseElement).toBeTruthy();
  });
});
