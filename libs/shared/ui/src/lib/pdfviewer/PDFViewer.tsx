/* eslint-disable-next-line */
import React, { useState } from 'react';
import { Document, Page, pdfjs } from 'react-pdf';

import workerSrc from './pdf-worker';
import { Spinner } from '@chakra-ui/react';

pdfjs.GlobalWorkerOptions.workerSrc = workerSrc;

export interface PDFViewerProps {
  file: string;
}

export function PDFViewer({ file }: PDFViewerProps) {
  const [numPages, setNumPages] = useState<number>(1);

  function onDocumentLoadSuccess({
    numPages: nextNumPages,
  }: {
    numPages: number;
  }) {
    setNumPages(nextNumPages);
  }

  return (
    <Document
      file={file}
      onLoadSuccess={onDocumentLoadSuccess}
      renderMode="svg"
      loading={<Spinner />}
    >
      {Array.from({ length: numPages }, (_, index) => (
        <Page
          key={`page_${index + 1}`}
          pageNumber={index + 1}
          renderAnnotationLayer={false}
          renderTextLayer={false}
          scale={1.8}
        />
      ))}
    </Document>
  );
}

export default PDFViewer;
