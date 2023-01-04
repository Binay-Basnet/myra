import { FormProvider, useForm } from 'react-hook-form';
import { useRouter } from 'next/router';
import { useQueryClient } from '@tanstack/react-query';

import { asyncToast, Box, Container, FormFooter, FormHeader } from '@myra-ui';

import {
  CashTransferMode,
  CashValue,
  TellerTransferInput,
  TellerTransferType,
  useAppSelector,
  useSetCashInTransitTransferMutation,
} from '@coop/cbs/data-access';
import { featureCode } from '@coop/shared/utils';

import { CashTransitInfo, Denomination, TransferMode } from '../components';

/* eslint-disable-next-line */
export interface AddCashTransitTransferProps {}

const cashOptions: Record<string, string> = {
  '1000': CashValue.Cash_1000,
  '500': CashValue.Cash_500,
  '100': CashValue.Cash_100,
  '50': CashValue.Cash_50,
  '25': CashValue.Cash_25,
  '20': CashValue.Cash_20,
  '10': CashValue.Cash_10,
  '5': CashValue.Cash_5,
  '2': CashValue.Cash_2,
  '1': CashValue.Cash_1,
};

export const AddCashTransitTransfer = () => {
  const router = useRouter();

  const queryClient = useQueryClient();

  const user = useAppSelector((state) => state.auth?.user);

  const branchData = user?.branch;

  const { mutateAsync } = useSetCashInTransitTransferMutation();

  const methods = useForm<TellerTransferInput>({
    defaultValues: {
      transferType: TellerTransferType.CashInTransit,
      transferMode: CashTransferMode.Collected,
      srcTellerID: [user?.firstName?.local, user?.lastName?.local].join(' '),
      srcBranch: branchData?.name,
    },
  });

  const { watch, getValues } = methods;

  const amount = watch('amount');

  const denominations = watch('denominations');

  const denominationTotal =
    denominations?.reduce(
      (accumulator: number, curr: { amount: string }) => accumulator + Number(curr.amount),
      0 as number
    ) ?? 0;

  const handleSubmit = () => {
    const values = getValues();
    const updatedData = {
      ...values,
      srcTellerID: user?.id,
      srcBranch: branchData?.id,
      denominations:
        values?.denominations?.map(({ value, quantity }) => ({
          value: cashOptions[value as string],
          quantity,
        })) ?? [],
    };

    asyncToast({
      id: 'add-vault-transfer',
      msgs: {
        loading: 'Adding Cash In Transit Transfer',
        success: 'Cash In Transit Transfer Added',
      },
      promise: mutateAsync({ data: updatedData as TellerTransferInput }),
      onSuccess: () => {
        queryClient.invalidateQueries(['getTellerTransactionListData']);
        queryClient.invalidateQueries(['getMe']);

        router.push('/transfer/cash-transit-transfer/list');
      },
    });
  };

  return (
    <>
      <Container minW="container.xl" height="fit-content">
        <Box position="sticky" top="110px" bg="gray.100" width="100%" zIndex="10">
          <FormHeader
            title={`New Cash in Transit - ${featureCode.newVaultTransfer}`}
            closeLink="/transfer/cash-transit-transfer/list"
          />
        </Box>

        <Box bg="white">
          <FormProvider {...methods}>
            <form>
              <Box minH="calc(100vh - 170px)" pb="s60">
                <CashTransitInfo />
                <TransferMode />
                <Denomination availableCash={user?.userBalance} />
              </Box>
            </form>
          </FormProvider>
        </Box>
      </Container>

      <Box position="relative" margin="0px auto">
        <Box bottom="0" position="fixed" width="100%" bg="gray.100" zIndex={10}>
          <Container minW="container.xl" height="fit-content">
            <FormFooter
              mainButtonLabel="Done"
              mainButtonHandler={handleSubmit}
              isMainButtonDisabled={Number(denominationTotal) !== Number(amount)}
            />
          </Container>
        </Box>
      </Box>
    </>
  );
};

export default AddCashTransitTransfer;
