import { render } from '@testing-library/react';

import FormMap from './FormMap';

describe('FormMap', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<FormMap />);
    expect(baseElement).toBeTruthy();
  });
});
