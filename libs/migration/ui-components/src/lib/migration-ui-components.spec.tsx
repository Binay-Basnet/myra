import { render } from '@testing-library/react';

import MigrationUiComponents from './migration-ui-components';

describe('MigrationUiComponents', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<MigrationUiComponents />);
    expect(baseElement).toBeTruthy();
  });
});
