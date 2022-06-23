import { render } from '@testing-library/react';

import ShareSettingsCard from './ShareSettingsCard';

describe('SettingsCard', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<ShareSettingsCard title="Hello" />);
    expect(baseElement).toBeTruthy();
  });
});
