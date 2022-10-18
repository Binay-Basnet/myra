import { render } from '@testing-library/react';

import { DetailPageHeader } from './DetailPageHeader';

describe('DetailPageHeader', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<DetailPageHeader member={{}} />);
    expect(baseElement).toBeTruthy();
  });
});
