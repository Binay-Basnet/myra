import { render } from '@testing-library/react';

import NumberInput from './NumberInput';

describe('NumberInput', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<NumberInput />);
    expect(baseElement).toBeTruthy();
  });
});
