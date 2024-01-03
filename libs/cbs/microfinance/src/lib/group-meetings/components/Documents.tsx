import { useState } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { useRouter } from 'next/router';

import { asyncToast, Box, Button, FileViewer, Grid, Modal, Text } from '@myra-ui';

import {
  MfMeetingDocumentsInput,
  useAddMfDocumentsMutation,
  useListDocumentsQuery,
} from '@coop/cbs/data-access';
import { DetailsPageHeaderBox } from '@coop/shared/components';
import { FormFileInput, FormInput, FormTextArea } from '@coop/shared/form';

export const Documents = () => {
  const [isOpen, setIsOpen] = useState(false);
  const router = useRouter();

  const methods = useForm();
  const { getValues, reset } = methods;

  const { data, refetch } = useListDocumentsQuery({ meetingId: router?.query?.['id'] as string });
  const documentData = data?.microFinance?.groupMeeting?.listDocuments?.data;
  const { mutateAsync } = useAddMfDocumentsMutation();

  const onClose = () => {
    setIsOpen(false);
  };

  const onSave = () => {
    const values = getValues();
    asyncToast({
      id: 'add-documents',
      msgs: {
        success: 'new documents added succesfully',
        loading: 'adding new documents',
      },
      onSuccess: () => {
        refetch();
        onClose();
        reset({
          title: '',
          description: '',
          files: null,
        });
      },
      promise: mutateAsync({
        meetingId: router?.query?.['id'] as string,
        input: {
          ...values,
        } as MfMeetingDocumentsInput,
      }),
    });
  };

  return (
    <>
      <DetailsPageHeaderBox title="Documents" />
      <Box m="s24" p="s12" bg="white" borderRadius={5}>
        <Box display="flex" justifyContent="space-between" mb="s8">
          <Text fontSize="r1" fontWeight="semibold">
            Documents
          </Text>
          <Button onClick={() => setIsOpen(true)}>Add Documents</Button>
        </Box>
        <Grid templateColumns="repeat(2, 1fr)" gap="s16">
          {documentData?.map((item) => (
            <Box
              display="flex"
              flexDir="column"
              gap="s4"
              p="s8"
              border="1px"
              borderColor="border.layout"
              borderRadius={5}
            >
              <Text fontSize="r1">Title: {item?.title}</Text>
              <Text fontSize="r1">Description: {item?.description}</Text>
              {item?.docData?.map((i) => (
                <FileViewer fileName={i?.identifier} fileUrl={i?.url} />
              ))}
            </Box>
          ))}
        </Grid>

        {/* <Box>
          {data?.files?.map((item) => (
            <FileViewer fileUrl={item?.url} />
          ))}
        </Box> */}
      </Box>
      <Modal
        title="Add Documents"
        width="lg"
        open={isOpen}
        onClose={onClose}
        primaryButtonLabel="Save"
        primaryButtonHandler={onSave}
      >
        <FormProvider {...methods}>
          <Box display="flex" flexDir="column" gap="s8">
            <FormInput label="Title" name="title" />
            <FormTextArea label="Description" name="description" />
            <FormFileInput label="Attachment(Optional)" name="files" />
          </Box>
        </FormProvider>
      </Modal>
    </>
  );
};

export default Documents;
