import { useEffect, useState } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { useRouter } from 'next/router';
import { useQueryClient } from '@tanstack/react-query';

import { asyncToast, Box, Button, FileViewer, Modal, Text } from '@myra-ui';

import { MfDecisions, useUpsertDecisionMutation } from '@coop/cbs/data-access';
import { DetailsPageHeaderBox } from '@coop/shared/components';
import { FormFileInput, FormTextArea } from '@coop/shared/form';

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
        data?.files?.map((item) => item?.url)
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
      id: 'add-decision',
      msgs: {
        success: 'new decision added succesfully',
        loading: 'adding new decision',
      },
      onSuccess: () => {
        onClose();
        queryClient.invalidateQueries(['mfMeetingsDetails']);
      },
      promise: mutateAsync({
        meetingId: router?.query?.['id'] as string,
        data: {
          ...values,
        },
      }),
    });
  };

  return (
    <>
      <DetailsPageHeaderBox title="Decision" />
      <Box m="s24" p="s12" bg="white" borderRadius={5}>
        <Box display="flex" justifyContent="space-between">
          <Text fontSize="r1" fontWeight="semibold">
            Decision
          </Text>
          <Button onClick={() => setIsOpen(true)}>
            {data?.note ? 'Edit Decision' : 'Add Decision'}
          </Button>
        </Box>

        <Text fontSize="r1" fontWeight="medium">
          {data?.note || '-'}
        </Text>
        <Box>
          {data?.files?.map((item) => (
            <FileViewer fileUrl={item?.url} />
          ))}
        </Box>
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
