import { render } from '@testing-library/react';

import CbsKymFormFeatureCooperative from './cbs-kym-form-feature-cooperative';

describe('CbsKymFormFeatureCooperative', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<CbsKymFormFeatureCooperative />);
    expect(baseElement).toBeTruthy();
  });
});
