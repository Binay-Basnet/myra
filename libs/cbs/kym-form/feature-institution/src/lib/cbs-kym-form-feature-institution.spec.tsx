import { render } from '@testing-library/react';

import CbsKymFormFeatureInstitution from './cbs-kym-form-feature-institution';

describe('CbsKymFormFeatureInstitution', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<CbsKymFormFeatureInstitution />);
    expect(baseElement).toBeTruthy();
  });
});
