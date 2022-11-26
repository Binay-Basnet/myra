import React, { ReactElement } from 'react';
import { BsPrinter } from 'react-icons/bs';
import { FiEdit } from 'react-icons/fi';
import { useRouter } from 'next/router';

import { useGetMemberPdfQuery } from '@coop/cbs/data-access';
import {
  Box,
  Button,
  Container,
  FormFooter,
  Icon,
  Loader,
  MainLayout,
  PDFViewer,
} from '@myra-ui';

export const Pdf = () => {
  const router = useRouter();

  const { data, isLoading } = useGetMemberPdfQuery(
    {
      id: router.query['id'] as string,
    },
    {
      enabled: !!router.query['id'],
    }
  );

  return (
    <>
      <Container
        minW="container.xl"
        display="flex"
        alignItems="center"
        justifyContent="center"
        bg="white"
        minH="calc(100vh - 170px)"
      >
        {isLoading ? (
          <Loader />
        ) : (
          <PDFViewer file={data?.members?.memberPDF?.replace(/http/g, 'https') ?? 'pdf'} />
        )}
      </Container>
      <Box position="sticky" bottom="0" bg="gray.100" width="100%" zIndex="10">
        <Container minW="container.xl" height="fit-content" p="0">
          <FormFooter
            status={
              <Button
                variant="ghost"
                gap="s8"
                onClick={() => router.push(`/members/translation/${router.query['id']}`)}
              >
                <Icon as={FiEdit} />
                Back to editing
              </Button>
            }
            mainButtonHandler={() => router.push('/members/list')}
            mainButtonLabel="Complete"
            draftButton={
              <Button
                variant="ghost"
                gap="s8"
                isDisabled={data?.members?.memberPDF === '' || data?.members?.memberPDF === 'not'}
                onClick={() => window.open(data?.members?.memberPDF, '_blank')}
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
