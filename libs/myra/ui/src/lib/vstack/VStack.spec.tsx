import { render } from '@testing-library/react';

import VStack from './VStack';

describe('VStack', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<VStack />);
    expect(baseElement).toBeTruthy();
  });
});
