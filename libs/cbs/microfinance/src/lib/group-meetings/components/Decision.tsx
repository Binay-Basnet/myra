import { useEffect, useState } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { useRouter } from 'next/router';
import { useQueryClient } from '@tanstack/react-query';

import { asyncToast, Box, Button, Modal, Text } from '@myra-ui';

import { DocumentInsertInput, MfDecisions, useUpsertDecisionMutation } from '@coop/cbs/data-access';
import { DetailsPageHeaderBox } from '@coop/shared/components';
import { FormFileInput, FormTextArea } from '@coop/shared/form';

const documentMap = ['attachment'];

export const Decision = (props: { data: MfDecisions }) => {
  const [isOpen, setIsOpen] = useState(false);
  const router = useRouter();
  const { data } = props;
  const methods = useForm();
  const queryClient = useQueryClient();

  const { getValues, setValue } = methods;

  useEffect(() => {
    if (data?.note) {
      setValue('note', data?.note);
      setValue(
        'files',
        data?.files?.map((item) => item?.identifier)
      );
    }
  }, [data]);

  const { mutateAsync } = useUpsertDecisionMutation();

  const onClose = () => {
    setIsOpen(false);
  };

  const onSave = () => {
    const values = getValues();
    asyncToast({
      id: 'add-center',
      msgs: {
        success: 'new center added succesfully',
        loading: 'adding new center',
      },
      onSuccess: () => {
        onClose();
        queryClient.invalidateQueries(['mfMeetingsDetails']);
      },
      promise: mutateAsync({
        meetingId: router?.query?.['id'] as string,
        data: {
          note: values?.note,
          files: values?.files?.map((item: DocumentInsertInput, index: number) => ({
            fieldId: documentMap[index],
            identifiers: item?.identifiers || [],
          })),
        },
      }),
    });
  };

  return (
    <>
      <DetailsPageHeaderBox title="Decision" />
      <Box m="s24" p="s12" bg="white" borderRadius={5}>
        <Box display="flex" justifyContent="flex-end">
          <Button onClick={() => setIsOpen(true)}>
            {data?.note ? 'Edit Decision' : 'Add Decision'}
          </Button>
        </Box>

        <Text fontSize="r1" fontWeight="semibold">
          Decision
        </Text>
        <Text fontSize="r1" fontWeight="medium">
          {data?.note || '-'}
        </Text>
      </Box>
      <Modal
        title="Add Decision"
        width="lg"
        hasCloseBtn={false}
        open={isOpen}
        onClose={onClose}
        primaryButtonLabel="Save"
        primaryButtonHandler={onSave}
      >
        <FormProvider {...methods}>
          <Box display="flex" flexDir="column" gap="s8">
            <FormTextArea label="Decision" name="note" />
            <FormFileInput label="Attachment(Optional)" name="files" />
          </Box>
        </FormProvider>
      </Modal>
    </>
  );
};

export default Decision;
