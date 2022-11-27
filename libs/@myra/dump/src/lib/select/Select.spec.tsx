import { render } from '@testing-library/react';

import Select from './Select';

describe('Select', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<Select options={[{ label: '131', value: 13189 }]} />);
    expect(baseElement).toBeTruthy();
  });
});
