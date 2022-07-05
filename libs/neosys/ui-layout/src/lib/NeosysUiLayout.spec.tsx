import { render } from '@testing-library/react';

import NeosysUiLayout from './NeosysUiLayout';

describe('NeosysUiLayout', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<NeosysUiLayout />);
    expect(baseElement).toBeTruthy();
  });
});
