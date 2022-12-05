import { render } from '@testing-library/react';

import AddButtonList from './AddButtonList';

describe('AddButtonList', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<AddButtonList />);
    expect(baseElement).toBeTruthy();
  });
});
