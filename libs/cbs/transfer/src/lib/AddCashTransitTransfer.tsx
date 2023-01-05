import { FormProvider, useForm } from 'react-hook-form';
import { useRouter } from 'next/router';
import { useQueryClient } from '@tanstack/react-query';

import { asyncToast, Box, Container, FormFooter, FormHeader } from '@myra-ui';

import {
  CashInTransitInput,
  CashTransferMode,
  useAppSelector,
  useSetCashInTransitTransferMutation,
} from '@coop/cbs/data-access';
import { ROUTES } from '@coop/cbs/utils';
import { featureCode } from '@coop/shared/utils';

import { CashTransitInfo, TransferMode } from '../components';

/* eslint-disable-next-line */
export interface AddCashTransitTransferProps {}

// const cashOptions: Record<string, string> = {
//   '1000': CashValue.Cash_1000,
//   '500': CashValue.Cash_500,
//   '100': CashValue.Cash_100,
//   '50': CashValue.Cash_50,
//   '25': CashValue.Cash_25,
//   '20': CashValue.Cash_20,
//   '10': CashValue.Cash_10,
//   '5': CashValue.Cash_5,
//   '2': CashValue.Cash_2,
//   '1': CashValue.Cash_1,
// };

type CustomTellerTransferInput = Omit<CashInTransitInput, 'denominations'> & {
  denominations: { value?: string; quantity?: number; amount?: string }[];
};

export const AddCashTransitTransfer = () => {
  const router = useRouter();

  const queryClient = useQueryClient();

  const user = useAppSelector((state) => state.auth?.user);

  const branchData = user?.branch;

  const { mutateAsync } = useSetCashInTransitTransferMutation();

  const methods = useForm<CustomTellerTransferInput>({
    defaultValues: {
      transferMode: CashTransferMode.Collected,
      senderTeller: [user?.firstName?.local, user?.lastName?.local].join(' '),
      senderServiceCentre: branchData?.name,
    },
  });

  const { getValues } = methods;

  // const amount = watch('amount');

  // const denominations = watch('denomination');

  // const denominationTotal =
  //   denominations?.reduce(
  //     (accumulator: number, curr: { amount: string }) => accumulator + Number(curr.amount),
  //     0 as number
  //   ) ?? 0;

  const handleSubmit = () => {
    const values = getValues();
    const updatedData = {
      ...values,
      senderTeller: user?.id,
      senderServiceCentre: branchData?.id,
      // denomination:
      //   values?.denomination?.map(({ value, quantity }) => ({
      //     value: cashOptions[value as string],
      //     quantity,
      //   })) ?? [],
    };

    asyncToast({
      id: 'add-vault-transfer',
      msgs: {
        loading: 'Adding Cash In Transit Transfer',
        success: 'Cash In Transit Transfer Added',
      },
      promise: mutateAsync({ data: updatedData as CashInTransitInput }),
      onSuccess: () => {
        queryClient.invalidateQueries(['getCashInTransitList']);
        queryClient.invalidateQueries(['getMe']);

        router.push(ROUTES.CBS_TRANSFER_CASH_IN_TRANSIT_LIST);
      },
    });
  };

  return (
    <>
      <Container minW="container.xl" height="fit-content">
        <Box position="sticky" top="110px" bg="gray.100" width="100%" zIndex="10">
          <FormHeader
            title={`New Cash in Transit - ${featureCode.newVaultTransfer}`}
            closeLink={ROUTES.CBS_TRANSFER_CASH_IN_TRANSIT_LIST}
          />
        </Box>

        <Box bg="white">
          <FormProvider {...methods}>
            <form>
              <Box minH="calc(100vh - 170px)" pb="s60">
                <CashTransitInfo />
                <TransferMode />
                {/* <Denomination availableCash={user?.userBalance} /> */}
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
              // isMainButtonDisabled={Number(denominationTotal) !== Number(amount)}
            />
          </Container>
        </Box>
      </Box>
    </>
  );
};

export default AddCashTransitTransfer;
