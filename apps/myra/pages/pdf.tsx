import React, { ReactElement, useEffect, useState } from 'react';
import { BsPrinter } from 'react-icons/bs';
import { FiEdit } from 'react-icons/fi';
import { useRouter } from 'next/router';
import { Spinner } from '@chakra-ui/react';

import { useGetMemberPdfMutation } from '@coop/cbs/data-access';
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
  const router = useRouter();
  const [fileUrl, setFileUrl] = useState('');

  const { mutateAsync } = useGetMemberPdfMutation();

  useEffect(() => {
    const getFile = async () => {
      if (router.query['id']) {
        const response = await mutateAsync({
          id: router.query['id'] as string,
        });
        if (
          response &&
          response?.members?.memberPDF &&
          response?.members?.memberPDF !== ''
        ) {
          setFileUrl(response?.members?.memberPDF as string);
        } else {
          setFileUrl('not');
        }
      }
    };

    getFile();
  }, [mutateAsync, router.isReady]);

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
        {!fileUrl ? (
          <Spinner />
        ) : (
          <PDFViewer file={fileUrl.replace(/http/g, 'https')} />
        )}
      </Container>
      <Box position="sticky" bottom="0" bg="gray.100" width="100%" zIndex="10">
        <Container minW="container.xl" height="fit-content" p="0">
          <FormFooter
            status={
              <Button
                variant="ghost"
                gap="s8"
                onClick={() =>
                  router.push('/members/translation/' + router.query['id'])
                }
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
                isDisabled={fileUrl === '' || fileUrl === 'not'}
                onClick={() => window.open(fileUrl, '_blank')}
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
