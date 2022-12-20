import { render } from '@testing-library/react';

import Chips from './Chips';

describe('Chips', () => {
  it('should render successfully', () => {
    const { baseElement } = render(
      <Chips label="Success" size="md" theme="success" type="label" variant="solid" />
    );
    expect(baseElement).toBeTruthy();
  });
});
