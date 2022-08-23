import { render } from '@testing-library/react';

import SettingsFooter from './SettingsFooter';

describe('SettingsFooter', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<SettingsFooter />);
    expect(baseElement).toBeTruthy();
  });
});
