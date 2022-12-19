import { render } from '@testing-library/react';

import Tags from './Tags';

describe('Tags', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<Tags label="Success" type="tag" />);
    expect(baseElement).toBeTruthy();
  });
});
