import { render } from '@testing-library/react';

import DhaddaMigrationUiLayout from './dhadda-migration-ui-layout';

describe('DhaddaMigrationUiLayout', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<DhaddaMigrationUiLayout />);
    expect(baseElement).toBeTruthy();
  });
});
