import { useMemo } from 'react';
import { useFormContext } from 'react-hook-form';

import { Box, FormSection, Grid, GridItem, Text } from '@myra-ui';

import {
  useGetCoaAccountDetailsQuery,
  useGetCoaAccountsUnderLeafListQuery,
} from '@coop/cbs/data-access';
import { FormLeafCoaHeadSelect, FormSelect } from '@coop/shared/form';
import { debitCreditConverter } from '@coop/shared/utils';

import { useGetLedgersForTransfer } from '../../hooks';

export const DestinationDetails = () => {
  const { watch } = useFormContext();

  const ledgerAccountsListData = useGetLedgersForTransfer();

  const destinationCoaHead = watch('destinationCoaHead');

  const { data: ledgerListData, isFetching } = useGetCoaAccountsUnderLeafListQuery(
    {
      parentId: destinationCoaHead,
      currentBranch: true,
    },
    { enabled: !!destinationCoaHead && destinationCoaHead !== 'undefined' }
  );

  const ledgerAccountOptions = useMemo(
    () =>
      ledgerListData?.settings?.chartsOfAccount?.accountsUnderLeaf?.map((ledger) => ({
        label: ledger?.name as string,
        value: ledger?.accountId as string,
      })) ?? [],
    [ledgerListData]
  );

  const destinationLedgerId = watch('destinationLedgerId');

  const { data: accountQueryData } = useGetCoaAccountDetailsQuery(
    {
      id: destinationLedgerId as string,
    },
    {
      enabled: !!destinationLedgerId && destinationLedgerId !== 'undefined',
    }
  );

  const newAccountBalance = useMemo(() => {
    const closingBalance =
      accountQueryData?.settings?.chartsOfAccount?.coaAccountDetails?.data?.overview
        ?.closingBalance;

    const accountBalance =
      accountQueryData?.settings?.chartsOfAccount?.coaAccountDetails?.data?.overview
        ?.balanceType === 'DR'
        ? 0 - Number(closingBalance)
        : Number(closingBalance);

    const transferBalance =
      ledgerAccountsListData?.accounting?.ledgerBalanceTransfer?.getLedgerAccounts
        ?.totalTransferBalance?.amountType === 'DR'
        ? 0 -
          Number(
            ledgerAccountsListData?.accounting?.ledgerBalanceTransfer?.getLedgerAccounts
              ?.totalTransferBalance?.amount
          )
        : Number(
            ledgerAccountsListData?.accounting?.ledgerBalanceTransfer?.getLedgerAccounts
              ?.totalTransferBalance?.amount
          );

    const newBalance = transferBalance + accountBalance;

    return newBalance > 0
      ? debitCreditConverter(newBalance, 'CR')
      : debitCreditConverter(Math.abs(newBalance), 'DR');
  }, [accountQueryData, ledgerAccountsListData]);

  const transferSummary = useMemo(
    () => [
      {
        heading: 'Current Balance',
        subHeading: debitCreditConverter(
          accountQueryData?.settings?.chartsOfAccount?.coaAccountDetails?.data?.overview
            ?.closingBalance as string,
          accountQueryData?.settings?.chartsOfAccount?.coaAccountDetails?.data?.overview
            ?.balanceType as string
        ),
      },
      {
        heading: 'Total Transfer Balance',
        subHeading: debitCreditConverter(
          ledgerAccountsListData?.accounting?.ledgerBalanceTransfer?.getLedgerAccounts
            ?.totalTransferBalance?.amount as string,
          ledgerAccountsListData?.accounting?.ledgerBalanceTransfer?.getLedgerAccounts
            ?.totalTransferBalance?.amountType as string
        ),
      },
      {
        heading: 'New Balance',
        subHeading: newAccountBalance,
      },
    ],
    [accountQueryData, ledgerAccountsListData, newAccountBalance]
  );

  return ledgerAccountsListData?.accounting?.ledgerBalanceTransfer?.getLedgerAccounts
    ?.totalLedgerAccounts ? (
    <FormSection header="Destination Details" templateColumns={2} divider={false}>
      <FormLeafCoaHeadSelect name="destinationCoaHead" label="COA Head" menuPlacement="top" />

      <FormSelect
        name="destinationLedgerId"
        label="Ledger Account"
        options={ledgerAccountOptions}
        isLoading={isFetching}
        menuPlacement="top"
      />

      {destinationLedgerId && (
        <GridItem colSpan={3}>
          <Box p="s16" borderRadius="br3" bgColor="highlight.500">
            <Grid templateColumns="repeat(3, 1fr)">
              {transferSummary?.map((info) => (
                <Box display="flex" flexDirection="column" gap="s4">
                  <Text fontSize="r1" fontWeight={400} color="gray.600">
                    {info.heading}
                  </Text>
                  <Text fontSize="r1" fontWeight={600} color="gray.800">
                    {info.subHeading}
                  </Text>
                </Box>
              ))}
            </Grid>
          </Box>
        </GridItem>
      )}
    </FormSection>
  ) : null;
};
