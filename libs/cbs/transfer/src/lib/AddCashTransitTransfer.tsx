import { useMemo } from 'react';
import { useForm } from 'react-hook-form';
import { useRouter } from 'next/router';
import { useQueryClient } from '@tanstack/react-query';

import { asyncToast } from '@myra-ui';

import {
  CashInTransitInput,
  CashTransferMode,
  useAppSelector,
  useGetUserAndBranchBalanceQuery,
  useSetCashInTransitTransferMutation,
} from '@coop/cbs/data-access';
import { ROUTES } from '@coop/cbs/utils';
import { CashOptions } from '@coop/shared/components';
import { FormLayout } from '@coop/shared/form';
import { featureCode } from '@coop/shared/utils';

import { CashTransitInfo, Denomination, TransferMode } from '../components';

/* eslint-disable-next-line */
export interface AddCashTransitTransferProps {}

type CustomTellerTransferInput = Omit<CashInTransitInput, 'denomination'> & {
  denomination: { value?: string; quantity?: number; amount?: string }[];
};

export const AddCashTransitTransfer = () => {
  const router = useRouter();

  const queryClient = useQueryClient();

  const user = useAppSelector((state) => state.auth?.user);

  const { data: balanceQueryData } = useGetUserAndBranchBalanceQuery();

  const userBalance = useMemo(
    () => balanceQueryData?.auth?.me?.data?.user?.userBalance,
    [balanceQueryData]
  );

  const branchData = user?.currentBranch;

  const { mutateAsync } = useSetCashInTransitTransferMutation();

  const methods = useForm<CustomTellerTransferInput>({
    defaultValues: {
      transferMode: CashTransferMode.Collected,
      senderTeller: [user?.firstName?.local, user?.lastName?.local].join(' '),
      senderServiceCentre: branchData?.name,
    },
  });

  const { watch, getValues } = methods;

  const amount = watch('amount');

  const denominations = watch('denomination');

  const denominationTotal =
    denominations?.reduce(
      (accumulator: number, { amount: currAmount }) => accumulator + Number(currAmount),
      0 as number
    ) ?? 0;

  const handleSubmit = () => {
    const values = getValues();
    const updatedData = {
      ...values,
      senderTeller: user?.id,
      senderServiceCentre: branchData?.id,
      denomination:
        values?.denomination?.map(({ value, quantity }) => ({
          value: CashOptions[value as string],
          quantity,
        })) ?? [],
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
        // queryClient.invalidateQueries(['getMe']);
        router.push(ROUTES.CBS_TRANSFER_CASH_IN_TRANSIT_LIST);
      },
    });
  };

  return (
    <FormLayout methods={methods}>
      <FormLayout.Header
        title={`New Cash in Transit - ${featureCode.newVaultTransfer}`}
        closeLink={ROUTES.CBS_TRANSFER_CASH_IN_TRANSIT_LIST}
      />

      <FormLayout.Content>
        <FormLayout.Form>
          <CashTransitInfo />
          <TransferMode />
          <Denomination availableCash={userBalance} />
        </FormLayout.Form>
      </FormLayout.Content>

      <FormLayout.Footer
        mainButtonLabel="Done"
        mainButtonHandler={handleSubmit}
        isMainButtonDisabled={Number(denominationTotal) !== Number(amount)}
      />
    </FormLayout>
  );
};

export default AddCashTransitTransfer;
