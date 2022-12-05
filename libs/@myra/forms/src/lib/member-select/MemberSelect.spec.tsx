import { render } from '@testing-library/react';

import MemberSelect from './MemberSelect';

describe('MemberSelect', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<MemberSelect />);
    expect(baseElement).toBeTruthy();
  });
});
