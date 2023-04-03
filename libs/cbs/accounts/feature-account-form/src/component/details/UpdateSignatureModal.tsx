import { useState } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { useQueryClient } from '@tanstack/react-query';

import { Alert, asyncToast, Box, Button, Modal, Text } from '@myra-ui';

import { useSetupdateSignatureMutation } from '@coop/cbs/data-access';
import { FormFileInput } from '@coop/shared/form';

import { useAccountDetails } from '../../hooks/useAccountDetails';

interface IUpdateSignatureProps {
  isOpen: boolean;
  onClose: () => void;
}

export const UpdateSignatureModal = ({ isOpen, onClose }: IUpdateSignatureProps) => {
  const { accountDetails } = useAccountDetails();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const handleModalClose = () => {
    setIsModalOpen(false);
  };
  const queryClient = useQueryClient();

  const router = useRouter();

  const methods = useForm({
    mode: 'onChange',
  });

  const { mutateAsync } = useSetupdateSignatureMutation();

  const handleUpdateTeenureAccount = () => {
    const values = methods.getValues();

    asyncToast({
      id: 'update-signature',
      msgs: {
        success: 'Signature updated successfully',
        loading: 'Updating Signature',
      },
      onSuccess: () => {
        queryClient.invalidateQueries(['getAccountDetailsData']);

        onClose();
      },
      promise: mutateAsync({
        accountID: router?.query?.['id'] as string,
        data: values?.['fileUploads'],
      }),
    });
  };

  return isOpen ? (
    <Modal
      open={isOpen}
      onClose={onClose}
      isCentered
      title={
        <Text fontSize="r2" color="neutralColorLight.Gray-80" fontWeight="SemiBold">
          Update Installment Signature
        </Text>
      }
      footer={
        <Box display="flex" px={5} pb={5} justifyContent="flex-end">
          <Button onClick={handleUpdateTeenureAccount}>Save</Button>
        </Box>
      }
      width="xl"
    >
      <FormProvider {...methods}>
        <Box display="flex" flexDir="column" gap={5}>
          <Alert status="info" hideCloseIcon>
            <Box display="flex" justifyContent="space-between">
              <Text>Existing Signature for this account can be viewed here.</Text>
              <Text
                color="blue.500"
                fontWeight="medium"
                cursor="pointer"
                onClick={() => setIsModalOpen(true)}
              >
                View
              </Text>
            </Box>
          </Alert>
          <FormFileInput name="fileUploads" label="File Upload" size="md" />
        </Box>
      </FormProvider>
      <Modal open={isModalOpen} onClose={handleModalClose} isCentered title="Signature" width="xs">
        <Image
          src={accountDetails?.member?.signaturePicUrl as string}
          alt="Signature"
          width={400}
          height={400}
        />
      </Modal>
    </Modal>
  ) : null;
};
