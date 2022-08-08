import { render } from '@testing-library/react';

import CbsShareFeaturesShareReturn from './CbsShareFeaturesShareReturn';

describe('CbsShareFeaturesShareReturn', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<CbsShareFeaturesShareReturn />);
    expect(baseElement).toBeTruthy();
  });
});
