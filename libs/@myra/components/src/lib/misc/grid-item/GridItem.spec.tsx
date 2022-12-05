import { render } from '@testing-library/react';

import GridItem from './GridItem';

describe('GridItem', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<GridItem />);
    expect(baseElement).toBeTruthy();
  });
});
