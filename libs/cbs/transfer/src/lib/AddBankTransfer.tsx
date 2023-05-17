import { useMemo } from 'react';
import { useForm } from 'react-hook-form';
import { useRouter } from 'next/router';

import { asyncToast, Box, FormSection, GridItem } from '@myra-ui';

import {
  TellerBankTransferInput,
  TellerBankTransferType,
  useAppSelector,
  useGetUserAndBranchBalanceQuery,
  useSetBankTransferMutation,
} from '@coop/cbs/data-access';
import { ROUTES } from '@coop/cbs/utils';
import {
  FormBankSelect,
  FormInput,
  FormLayout,
  FormSwitchTab,
  FormTextArea,
} from '@coop/shared/form';

import { BalanceCard } from '../components';

/* eslint-disable-next-line */
export interface AddBankTransferProps {}

export const AddBankTransfer = () => {
  const methods = useForm({
    defaultValues: {
      transferType: TellerBankTransferType?.Deposit,
    },
  });
  const router = useRouter();
  const user = useAppSelector((state) => state.auth?.user);

  const { data: balanceQueryData } = useGetUserAndBranchBalanceQuery();

  const userBalance = useMemo(
    () => balanceQueryData?.auth?.me?.data?.user?.userBalance,
    [balanceQueryData]
  );

  // const { data } = useGetBankListQuery();

  const booleanList = [
    {
      label: 'Deposit',
      value: TellerBankTransferType?.Deposit,
    },
    {
      label: 'Withdraw',
      value: TellerBankTransferType?.Withdraw,
    },
  ];

  const {
    getValues,
    watch,
    formState: { isDirty },
  } = methods;
  const { mutateAsync } = useSetBankTransferMutation();

  const handleSubmit = () => {
    const value = getValues();

    asyncToast({
      id: 'add-vault-transfer',
      msgs: {
        loading: 'Adding Bank Transfer',
        success: 'Bank Transfer Successful',
      },
      promise: mutateAsync({ data: { ...value, tellerId: user?.id } as TellerBankTransferInput }),
      onSuccess: () => {
        router.push(ROUTES.CBS_TRANSFER_BANK_LIST);
      },
    });
  };

  const isDeposit = watch('transferType') === TellerBankTransferType?.Deposit;

  return (
    <FormLayout methods={methods}>
      <FormLayout.Header
        title="Add Bank Transfer"
        closeLink={ROUTES.CBS_TRANSFER_BANK_LIST}
        isFormDirty={isDirty}
      />

      <FormLayout.Content>
        <FormLayout.Form>
          <Box display="flex" flexDir="column" gap={5}>
            <FormSection>
              <GridItem colSpan={2}>
                <FormInput
                  name="tellerId"
                  label="Teller Name"
                  value={[user?.firstName?.local, user?.lastName?.local].join(' ')}
                  isDisabled
                />
              </GridItem>
            </FormSection>

            {isDeposit && (
              <FormSection>
                <BalanceCard label="Teller Bank Available Cash" balance={userBalance ?? '0'} />
              </FormSection>
            )}

            <FormSection header="Transfer Details" divider={false}>
              <GridItem colSpan={3}>
                <FormSwitchTab label="Transfer Type" options={booleanList} name="transferType" />
              </GridItem>
              <GridItem colSpan={2}>
                <FormBankSelect isRequired name="bankId" label="Select Bank" currentBranchOnly />
              </GridItem>
              <GridItem colSpan={1}>
                <FormInput name="amount" label="Amount" />
              </GridItem>
              <GridItem colSpan={2}>
                <FormTextArea name="note" label="Note" />
              </GridItem>
            </FormSection>
          </Box>
        </FormLayout.Form>
      </FormLayout.Content>

      <FormLayout.Footer mainButtonLabel="Done" mainButtonHandler={handleSubmit} />
    </FormLayout>
  );
};

export default AddBankTransfer;
