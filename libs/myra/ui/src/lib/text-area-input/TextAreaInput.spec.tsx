import { render } from '@testing-library/react';

import TextAreaInput from './TextAreaInput';

describe('TextAreaInput', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<TextAreaInput />);
    expect(baseElement).toBeTruthy();
  });
});
