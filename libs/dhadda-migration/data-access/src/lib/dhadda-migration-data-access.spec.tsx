import { render } from '@testing-library/react';

import DhaddaMigrationDataAccess from './dhadda-migration-data-access';

describe('DhaddaMigrationDataAccess', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<DhaddaMigrationDataAccess />);
    expect(baseElement).toBeTruthy();
  });
});
