import { render } from '@testing-library/react';

import FileInput from './FileInput';

describe('FileInput', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<FileInput />);
    expect(baseElement).toBeTruthy();
  });
});
