import { FormProvider, useForm } from 'react-hook-form';
import { useRouter } from 'next/router';
import { useQueryClient } from '@tanstack/react-query';

import { Alert, asyncToast, Box, Button, Modal, Text } from '@myra-ui';

import {
  NomineeAccountUpdateInput,
  useAccountDetails,
  useGetDefaultAccountListQuery,
  useSetupdateSavingsNomineeAccountMutation,
} from '@coop/cbs/data-access';
import { FormSelect } from '@coop/shared/form';

interface IChangeNomineeProps {
  isOpen: boolean;
  onClose: () => void;
}

export const AddTenureModal = ({ isOpen, onClose }: IChangeNomineeProps) => {
  const queryClient = useQueryClient();
  const { accountDetails } = useAccountDetails();
  const router = useRouter();

  const methods = useForm<NomineeAccountUpdateInput>();

  const { mutateAsync: setNominee } = useSetupdateSavingsNomineeAccountMutation();
  const { data: defaultAccountData } = useGetDefaultAccountListQuery(
    {
      memberId: accountDetails?.member?.id as string,
      productId: accountDetails?.productId as string,
    }
    // {
    //   enabled: (triggerQuery || triggerProductQuery) && !!productID,
    // }
  );
  const defaulDataAcc = defaultAccountData?.account?.listDefaultAccounts?.data;
  const defaultDataOptions = defaulDataAcc?.map((item) => ({
    label: item?.accountName as string,
    value: item?.id as string,
  }));

  const handleUpdateLinkedAccount = () => {
    const values = methods.getValues();

    asyncToast({
      id: 'update-loan-account-linked-account',
      msgs: {
        success: 'Nominee account updated successfully',
        loading: 'Updating Nominee account',
      },
      onSuccess: () => {
        queryClient.invalidateQueries(['getAccountDetailsData']);

        onClose();
      },
      promise: setNominee({
        NomineeAccountUpdateInput: {
          accountID: router.query['id'] as string,
          updatedAccountID: values?.updatedAccountID,
        },
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
          Update Linked Account
        </Text>
      }
      footer={
        <Box display="flex" px={5} pb={5} justifyContent="flex-end">
          <Button onClick={handleUpdateLinkedAccount}>Save</Button>
        </Box>
      }
      width="xl"
    >
      <FormProvider {...methods}>
        <Box display="flex" flexDir="column" gap={5}>
          <Alert
            status="info"
            title="Exisiting Nominee Account"
            subtitle={accountDetails?.nomineeAccountName as string}
            hideCloseIcon
          />

          <FormSelect
            label="Select New Nominee"
            name="updatedAccountID"
            options={defaultDataOptions}
          />
        </Box>
      </FormProvider>
    </Modal>
  ) : null;
};
