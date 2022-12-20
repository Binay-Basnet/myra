import { render } from '@testing-library/react';

import CbsShareFeatureShareRegisterDetail from './CbsShareFeatureShareRegisterDetail';

describe('CbsShareFeatureShareRegisterDetail', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<CbsShareFeatureShareRegisterDetail />);
    expect(baseElement).toBeTruthy();
  });
});
