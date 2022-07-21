import { render } from '@testing-library/react';

import AlertContainer from './AlertContainer';

describe('AlertContainer', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<AlertContainer />);
    expect(baseElement).toBeTruthy();
  });
});
