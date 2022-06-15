import { render } from '@testing-library/react';

import KYMInstitutionPage from './KYMInstitutionPage';

describe('KYMInstitutionPage', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<KYMInstitutionPage />);
    expect(baseElement).toBeTruthy();
  });
});
