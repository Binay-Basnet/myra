import { render } from '@testing-library/react';

import SlugInput from './SlugInput';

describe('SlugInput', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<SlugInput />);
    expect(baseElement).toBeTruthy();
  });
});
