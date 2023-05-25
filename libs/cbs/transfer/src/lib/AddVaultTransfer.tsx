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
  FormSwitchTab,
  FormTextArea,
} from '@coop/shared/form';
import { featureCode } from '@coop/shared/utils';

import { BalanceCard } from '../components';

/* eslint-disable-next-line */
export interface AddVaultTransferProps {}

const transferTypeOptions = [
  { label: 'Vault to Cash', value: TellerTransferType.VaultToCash },
  { label: 'Cash to Vault', value: TellerTransferType.CashToVault },
];

type CustomTellerTransferInput = Omit<TellerTransferInput, 'denominations'> & {
  denominations: { value?: string; quantity?: number; amount?: string }[];
  teller: string;
};

export const AddVaultTransfer = () => {
  const router = useRouter();

  const queryClient = useQueryClient();

  const user = useAppSelector((state) => state.auth?.user);

  const { data: balanceQueryData } = useGetUserAndBranchBalanceQuery();

  const { userBalance, branchBalance } = useMemo(
    () => ({
      userBalance: balanceQueryData?.auth?.me?.data?.user?.userBalance,
      branchBalance: balanceQueryData?.auth?.me?.data?.user?.currentBranch?.branchBalance,
    }),
    [balanceQueryData]
  );

  const { mutateAsync: setVaultTransfer } = useSetTellerTransferDataMutation();

  const methods = useForm<CustomTellerTransferInput>({
    defaultValues: {
      transferType: TellerTransferType.VaultToCash,
      teller: [user?.firstName?.local, user?.lastName?.local].join(' '),
    },
  });

  const { watch, getValues } = methods;

  const amount = watch('amount');

  const denominations = watch('denominations');

  const transferType = watch('transferType');
  const denominationTotal =
    denominations?.reduce(
      (accumulator: number, { amount: currAmount }) => accumulator + Number(currAmount),
      0 as number
    ) ?? 0;

  const handleSubmit = () => {
    const values = getValues();
    const filteredValues = {
      ...omit({ ...values }, ['teller']),
      denominations:
        values?.denominations?.map(({ value, quantity }) => ({
          value: CashOptions[value as string],
          quantity,
        })) ?? [],
    };

    if (values.transferType === TellerTransferType.VaultToCash) {
      filteredValues.destTellerID = user?.id;
    }

    if (values.transferType === TellerTransferType.CashToVault) {
      filteredValues.srcTellerID = user?.id;
    }

    asyncToast({
      id: 'add-vault-transfer',
      msgs: {
        loading: 'Adding Vault Transfer',
        success: 'Vault Tansfer Added',
      },
      promise: setVaultTransfer({ data: filteredValues as TellerTransferInput }),
      onSuccess: () => {
        queryClient.invalidateQueries(['getTellerTransactionListData']);
        // queryClient.invalidateQueries(['getMe']);

        router.push(ROUTES.CBS_TRANSFER_VAULT_LIST);
      },
    });
  };

  return (
    <FormLayout methods={methods}>
      <FormLayout.Header title={`New Vault Transfer - ${featureCode.newVaultTransfer}`} />

      <FormLayout.Content>
        <FormLayout.Form>
          <FormSection templateColumns={1}>
            <FormInput isRequired name="teller" label="Teller Name" isDisabled />
          </FormSection>

          <FormSection header="Transfer Cash Details" templateColumns={3} divider={false}>
            <GridItem colSpan={3}>
              <FormSwitchTab
                name="transferType"
                label="Transfer Type"
                options={transferTypeOptions}
              />
            </GridItem>

            {transferType && (
              <GridItem colSpan={3}>
                <BalanceCard
                  label={
                    transferType === TellerTransferType.VaultToCash
                      ? 'Available Cash in Vault'
                      : 'Available Cash with Teller'
                  }
                  balance={
                    (transferType === TellerTransferType.VaultToCash
                      ? branchBalance
                      : userBalance) ?? '0'
                  }
                />
              </GridItem>
            )}

            <FormAmountInput isRequired name="amount" label="Cash Amount" />

            <GridItem colSpan={3} display="flex" flexDirection="column">
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

export default AddVaultTransfer;
