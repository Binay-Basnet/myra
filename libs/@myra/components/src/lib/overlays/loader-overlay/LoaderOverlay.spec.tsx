import { render } from '@testing-library/react';

import LoaderOverlay from './LoaderOverlay';

describe('LoaderOverlay', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<LoaderOverlay />);
    expect(baseElement).toBeTruthy();
  });
});
