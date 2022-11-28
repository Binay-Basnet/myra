import { render } from '@testing-library/react';

import NoDataState from './NoDataState';

describe('NoDataState', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<NoDataState />);
    expect(baseElement).toBeTruthy();
  });
});
