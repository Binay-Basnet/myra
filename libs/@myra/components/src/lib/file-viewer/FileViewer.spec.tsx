import { render } from '@testing-library/react';

import FileViewer from './FileViewer';

describe('FileViewer', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<FileViewer />);
    expect(baseElement).toBeTruthy();
  });
});
