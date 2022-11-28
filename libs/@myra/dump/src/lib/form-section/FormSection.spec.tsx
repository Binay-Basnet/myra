import { render } from '@testing-library/react';

import FormSection from './FormSection';

describe('FormSection', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<FormSection />);
    expect(baseElement).toBeTruthy();
  });
});
