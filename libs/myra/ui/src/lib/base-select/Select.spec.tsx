import { render } from '@testing-library/react';

import BaseSelect from './BaseSelect';

describe('Select', () => {
  it('should render successfully', () => {
    const { baseElement } = render(
      <BaseSelect options={[{ label: '1', value: '1' }]} />
    );
    expect(baseElement).toBeTruthy();
  });
});
