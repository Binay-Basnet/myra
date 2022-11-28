import { render } from '@testing-library/react';

import PDFViewer from './PDFViewer';

describe('PDFViewer', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<PDFViewer />);
    expect(baseElement).toBeTruthy();
  });
});
