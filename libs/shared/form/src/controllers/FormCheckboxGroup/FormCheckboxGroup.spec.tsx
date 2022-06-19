import { render } from '@testing-library/react';

import FormCheckboxGroup from './FormCheckboxGroup';

describe('FormCheckboxGroup', () => {
  it('should render successfully', () => {
    const { baseElement } = render(
      <FormCheckboxGroup
        name="test"
        list={[{ label: 'test', value: 'test' }]}
      />
    );
    expect(baseElement).toBeTruthy();
  });
});
