import { render } from '@testing-library/react';

import CbsSettingsFeatureAuditLog from './CbsSettingsFeatureAuditLog';

describe('CbsSettingsFeatureAuditLog', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<CbsSettingsFeatureAuditLog />);
    expect(baseElement).toBeTruthy();
  });
});
