import { render } from '@testing-library/react';

import AccountSelect from './AccountSelect';

describe('AccountSelect', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<AccountSelect />);
    expect(baseElement).toBeTruthy();
  });
});
