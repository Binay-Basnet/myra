import { render } from '@testing-library/react';

import MyraGraphql from './myra-graphql';

describe('MyraGraphql', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<MyraGraphql />);
    expect(baseElement).toBeTruthy();
  });
});
