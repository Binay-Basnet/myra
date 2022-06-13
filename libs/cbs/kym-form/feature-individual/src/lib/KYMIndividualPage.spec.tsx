import { render } from '@testing-library/react';
import KYMIndividualPage from 'libs/cbs/kym-form/feature-individual/src/lib/KYMIndividualPage';

describe('KYMIndividualPage', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<KYMIndividualPage />);
    expect(baseElement).toBeTruthy();
  });
});
