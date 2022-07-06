import { render } from '@testing-library/react';

import NeosysUiComponents from './NeosysUiComponents';

describe('NeosysUiComponents', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<NeosysUiComponents />);
    expect(baseElement).toBeTruthy();
  });
});
