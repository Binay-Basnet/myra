import { render } from '@testing-library/react';

import ShareSettingsHeader from './ShareSettingsHeader';

describe('ShareSettingsHeader', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<ShareSettingsHeader />);
    expect(baseElement).toBeTruthy();
  });
});
