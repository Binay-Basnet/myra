import { useMemo } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { useRouter } from 'next/router';

import {
  asyncToast,
  Box,
  Container,
  Divider,
  FormFooter,
  FormHeader,
  Grid,
  GridItem,
  Text,
} from '@myra-ui';

import {
  TellerBankTransferInput,
  TellerBankTransferType,
  useAppSelector,
  useGetUserAndBranchBalanceQuery,
  useSetBankTransferMutation,
} from '@coop/cbs/data-access';
import { ROUTES } from '@coop/cbs/utils';
import { FormBankSelect, FormInput, FormSwitchTab, FormTextArea } from '@coop/shared/form';

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

  const { getValues, watch } = methods;
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
    <>
      <Container minW="container.xl" height="fit-content">
        <Box position="sticky" top="0" bg="gray.100" width="100%" zIndex="10">
          <FormHeader title="Add Bank Transfer" closeLink={ROUTES.CBS_TRANSFER_BANK_LIST} />
        </Box>

        <Box bg="white">
          <FormProvider {...methods}>
            <form>
              <Box minH="calc(100vh - 170px)" pb="60px" p="s24">
                <Box display="flex" flexDir="column" gap={5}>
                  <Grid templateColumns="repeat(3,1fr)" gap={2}>
                    <GridItem colSpan={2}>
                      <FormInput
                        name="tellerId"
                        label="Teller Name"
                        value={[user?.firstName?.local, user?.lastName?.local].join(' ')}
                        isDisabled
                      />
                    </GridItem>
                  </Grid>
                  <Divider />
                  {isDeposit && (
                    <>
                      {' '}
                      <GridItem colSpan={3}>
                        <BalanceCard
                          label="Teller Bank Available Cash"
                          balance={userBalance ?? '0'}
                        />
                      </GridItem>
                      <Divider />
                    </>
                  )}

                  <Text>Transfer Details</Text>
                  <FormSwitchTab label="Transfer Type" options={booleanList} name="transferType" />
                  <Grid templateColumns="repeat(3,1fr)" gap={2}>
                    <GridItem colSpan={2}>
                      <FormBankSelect
                        isRequired
                        name="bankId"
                        label="Select Bank"
                        currentBranchOnly
                      />
                    </GridItem>
                    <GridItem colSpan={1}>
                      <FormInput name="amount" label="Amount" />
                    </GridItem>
                  </Grid>
                  <GridItem colSpan={2}>
                    <FormTextArea name="note" label="Note" />
                  </GridItem>
                </Box>
              </Box>
            </form>
          </FormProvider>
        </Box>
      </Container>

      <Box position="relative" margin="0px auto">
        <Box bottom="0" position="fixed" width="100%" bg="gray.100" zIndex={10}>
          <Container minW="container.xl" height="fit-content">
            <FormFooter mainButtonLabel="Done" mainButtonHandler={handleSubmit} />
          </Container>
        </Box>
      </Box>
    </>
  );
};

export default AddBankTransfer;
