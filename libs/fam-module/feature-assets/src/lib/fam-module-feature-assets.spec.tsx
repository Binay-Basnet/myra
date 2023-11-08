import { render } from '@testing-library/react';

import FamModuleFeatureAssets from './fam-module-feature-assets';

describe('FamModuleFeatureAssets', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<FamModuleFeatureAssets />);
    expect(baseElement).toBeTruthy();
  });
});
