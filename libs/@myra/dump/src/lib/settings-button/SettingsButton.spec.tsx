import { render } from '@testing-library/react';

import SettingsButton from './SettingsButton';

describe('SettingsButton', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<SettingsButton />);
    expect(baseElement).toBeTruthy();
  });
});
