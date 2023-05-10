import { useMemo } from 'react';
import { useForm } from 'react-hook-form';
import { useRouter } from 'next/router';
import { useQueryClient } from '@tanstack/react-query';
import omit from 'lodash/omit';

import { asyncToast, FormSection, GridItem } from '@myra-ui';

import {
  TellerTransferInput,
  TellerTransferType,
  useAppSelector,
  useGetUserAndBranchBalanceQuery,
  useSetTellerTransferDataMutation,
} from '@coop/cbs/data-access';
import { ROUTES } from '@coop/cbs/utils';
import { CashOptions, DenominationTable } from '@coop/shared/components';
import {
  FormAmountInput,
  FormInput,
  FormLayout,
  FormTellerSelect,
  FormTextArea,
} from '@coop/shared/form';
import { featureCode } from '@coop/shared/utils';

import { BalanceCard } from '../components';

/* eslint-disable-next-line */
export interface AddTellerTransferProps {}

type CustomTellerTransferInput = Omit<TellerTransferInput, 'denominations'> & {
  denominations: { value?: string; quantity?: number; amount?: string }[];
};

export const AddTellerTransfer = () => {
  const router = useRouter();

  const queryClient = useQueryClient();

  const user = useAppSelector((state) => state?.auth?.user);

  const { data: balanceQueryData } = useGetUserAndBranchBalanceQuery();

  const userBalance = useMemo(
    () => balanceQueryData?.auth?.me?.data?.user?.userBalance,
    [balanceQueryData]
  );

  const methods = useForm<CustomTellerTransferInput>({
    defaultValues: { srcTellerID: [user?.firstName?.local, user?.lastName?.local].join(' ') },
  });

  const { watch, getValues } = methods;

  const { mutateAsync: setVaultTransfer } = useSetTellerTransferDataMutation();

  const amount = watch('amount');

  const denominations = watch('denominations');

  const denominationTotal =
    denominations?.reduce(
      (accumulator: number, { amount: currAmount }) => accumulator + Number(currAmount),
      0 as number
    ) ?? 0;

  const handleSubmit = () => {
    const values = getValues();

    const filteredValues = {
      ...omit({ ...values }, ['teller']),
      transferType: TellerTransferType.TellerTransfer,
      srcTellerID: user?.id,
      denominations:
        values?.denominations?.map(({ value, quantity }) => ({
          value: CashOptions[value as string],
          quantity,
        })) ?? [],
    };

    asyncToast({
      id: 'add-teller-transfer',
      msgs: {
        loading: 'Adding Teller Transfer',
        success: 'Teller Tansfer Added',
      },
      promise: setVaultTransfer({ data: filteredValues as TellerTransferInput }),
      onSuccess: () => {
        queryClient.invalidateQueries(['getTellerTransactionListData']);
        router.push(ROUTES.CBS_TRANSFER_TELLER_LIST);
      },
    });
  };

  return (
    <FormLayout methods={methods}>
      <FormLayout.Header title={`New Teller Transfer - ${featureCode.newTellerTransfer}`} />

      <FormLayout.Content>
        <FormLayout.Form>
          <FormSection templateColumns={2}>
            <FormInput name="srcTellerID" label="Sender" isDisabled />

            <FormTellerSelect
              isRequired
              name="destTellerID"
              label="Receiver"
              excludeIds={[user?.id as string]}
            />
          </FormSection>

          <FormSection templateColumns={3} divider={false}>
            <GridItem colSpan={3}>
              <BalanceCard label="Sender Teller Available Cash" balance={userBalance ?? '0'} />
            </GridItem>

            <FormAmountInput isRequired name="amount" label="Cash Amount" />
            <GridItem colSpan={3} display="flex" flexDirection="column" gap="s4">
              <DenominationTable
                fieldName="denominations"
                denominationTotal={denominationTotal}
                denominationTotalOnly
              />
            </GridItem>
            <FormTextArea isRequired name="note" label="Note" />
          </FormSection>
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

export default AddTellerTransfer;
