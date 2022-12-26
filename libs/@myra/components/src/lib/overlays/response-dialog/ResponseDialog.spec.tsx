import { render } from '@testing-library/react';

import ResponseDialog from './ResponseDialog';

describe('ResponseDialog', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<ResponseDialog />);
    expect(baseElement).toBeTruthy();
  });
});
