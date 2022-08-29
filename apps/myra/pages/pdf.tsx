import React, { ReactElement } from 'react';
import { BsPrinter } from 'react-icons/bs';
import { FiEdit } from 'react-icons/fi';

import {
  Box,
  Button,
  Container,
  FormFooter,
  Icon,
  MainLayout,
  PDFViewer,
} from '@coop/shared/ui';

export const Pdf = () => {
  return (
    <>
      <Container
        minW="container.xl"
        display="flex"
        alignItems="center"
        justifyContent="center"
        bg="white"
      >
        <PDFViewer file="https://myra-api-dev.raralabs.live/pdf/01GBKZ8QECGXA74C0ZMRA3INDI.pdf" />
      </Container>
      <Box position="sticky" bottom="0" bg="gray.100" width="100%" zIndex="10">
        <Container minW="container.xl" height="fit-content" p="0">
          <FormFooter
            status={
              <Button variant="ghost" gap="s8">
                <Icon as={FiEdit} />
                Back to editing
              </Button>
            }
            mainButtonLabel="Complete"
            draftButton={
              <Button
                variant="ghost"
                gap="s8"
                onClick={() =>
                  window.open(
                    'https://myra-api-dev.raralabs.live/pdf/01GBKZ8QECGXA74C0ZMRA3INDI.pdf',
                    '_blank'
                  )
                }
              >
                <Icon as={BsPrinter} />
                Print
              </Button>
            }
          />
        </Container>
      </Box>
    </>
  );
};

export default Pdf;

Pdf.getLayout = function getLayout(page: ReactElement) {
  return <MainLayout>{page}</MainLayout>;
};
