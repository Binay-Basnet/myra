import { render } from '@testing-library/react';

import AlternativeChannelsFeatureActivationForm from './AlternativeChannelsFeatureActivationForm';

describe('AlternativeChannelsFeatureActivationForm', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<AlternativeChannelsFeatureActivationForm />);
    expect(baseElement).toBeTruthy();
  });
});
