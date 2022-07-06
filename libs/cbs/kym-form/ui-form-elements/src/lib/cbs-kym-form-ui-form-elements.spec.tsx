import { render } from '@testing-library/react';

import CbsKymFormUiFormElements from './cbs-kym-form-ui-form-elements';

describe('CbsKymFormUiFormElements', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<CbsKymFormUiFormElements />);
    expect(baseElement).toBeTruthy();
  });
});
