import { render } from '@testing-library/react';

import FieldCardComponents from './FieldCardComponents';

describe('FieldCardComponents', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<FieldCardComponents />);
    expect(baseElement).toBeTruthy();
  });
});
