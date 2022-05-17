import { render } from '@testing-library/react';

import TextFields from './TextFields';

describe('TextFields', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<TextFields />);
    expect(baseElement).toBeTruthy();
  });
});
