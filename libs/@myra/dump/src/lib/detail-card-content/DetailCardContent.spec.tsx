import { render } from '@testing-library/react';

import DetailCardContent from './DetailCardContent';

describe('DetailCardContent', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<DetailCardContent />);
    expect(baseElement).toBeTruthy();
  });
});
