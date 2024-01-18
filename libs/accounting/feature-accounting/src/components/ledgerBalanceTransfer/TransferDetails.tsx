import { useMemo } from 'react';
import { useFormContext } from 'react-hook-form';

import { Box, FormSection, Grid, GridItem, Text } from '@myra-ui';

import { LedgerAmountTransferMode, LedgerBalanceEntry } from '@coop/cbs/data-access';
import { FormNumberInput, FormSelect } from '@coop/shared/form';
import { debitCreditConverter, quantityConverter } from '@coop/shared/utils';

import { SelectedLedgersTable } from './SelectedLedgersTable';
import { useGetLedgersForTransfer } from '../../hooks';

const transferModeOptions = [
  // { label: 'Evenly', value: LedgerAmountTransferMode.Even },
  // { label: 'Manual', value: LedgerAmountTransferMode.Manual },
  { label: 'All Amount', value: LedgerAmountTransferMode.All },
];

// const getAmountFilteredText = ({
//   min,
//   max,
//   condition,
// }: {
//   min: string;
//   max: string;
//   condition: '=' | '<' | '>' | '< >';
// }) => {
//   switch (condition) {
//     case '< >':
//       return `Ledger accounts with amounts between ${amountConverter(min)} and ${amountConverter(
//         max
//       )} are selected.`;

//     case '<':
//       return `Ledger accounts with amounts less than ${amountConverter(min || max)} are selected.`;

//     case '>':
//       return `Ledger accounts with amounts less than ${amountConverter(min || max)} are selected.`;

//     case '=':
//       return `Ledger accounts with amounts between ${amountConverter(min)} and ${amountConverter(
//         max
//       )} are selected.`;

//     default:
//       return '';
//   }
// };

export const TransferDetails = () => {
  const { watch } = useFormContext();

  const coaHead = watch('coaHead');

  const transferMode = watch('transferMode');

  const ledgerAccountsListData = useGetLedgersForTransfer();

  const transferSummary = useMemo(
    () => [
      {
        heading: 'COA Head',
        subHeading: coaHead?.map((head: { label: string }) => head?.label)?.join(', '),
      },
      {
        heading: 'Total Ledger Accounts',
        subHeading: quantityConverter(
          ledgerAccountsListData?.accounting?.ledgerBalanceTransfer?.getLedgerAccounts
            ?.totalLedgerAccounts ?? 0
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
        heading: 'Total Current Balance',
        subHeading: debitCreditConverter(
          ledgerAccountsListData?.accounting?.ledgerBalanceTransfer?.getLedgerAccounts
            ?.totalCurrentBalance?.amount as string,
          ledgerAccountsListData?.accounting?.ledgerBalanceTransfer?.getLedgerAccounts
            ?.totalCurrentBalance?.amountType as string
        ),
      },
    ],
    [ledgerAccountsListData, coaHead]
  );

  return (
    <FormSection
    // header={`All Ledgers of ${coaHead
    //   ?.map((head: { label: string }) => head?.label)
    //   ?.join(', ')}`}
    // subHeader="Uncheck ledger/s or Modify as per requierment"
    >
      <FormSelect
        name="transferMode"
        label="Amount Input Mode"
        options={transferModeOptions}
        isDisabled
      />

      {transferMode === 'EVEN' && (
        <FormNumberInput name="amount" label="Amount to be Transferred" />
      )}

      {/* {transferMode !== 'ALL' && (
        <Box display="flex" alignItems="flex-end">
          <FormAmountFilterPopover
            name="amountFilter"
            trigger={
              <Button variant="outline" leftIcon={<Icon as={BsFilter} />}>
                Filter Ledgers by Amount
              </Button>
            }
          />
        </Box>
      )} */}

      {ledgerAccountsListData?.accounting?.ledgerBalanceTransfer?.getLedgerAccounts
        ?.totalLedgerAccounts && (
        <>
          {/* <GridItem colSpan={3}>
            <Alert
              status="info"
              title={`${
                ledgerAccountsListData?.accounting?.ledgerBalanceTransfer?.getLedgerAccounts
                  ?.totalLedgerAccounts ?? 0
              } Ledger Account Found`}
              hideCloseIcon
            >
              {getAmountFilteredText({
                min: amountFilter?.min,
                max: amountFilter?.max,
                condition: amountFilter?.condition,
              }) && (
                <UnorderedList>
                  <ListItem>
                    <Text fontSize="s3" fontWeight={400} color="gray.700">
                      {getAmountFilteredText({
                        min: amountFilter?.min,
                        max: amountFilter?.max,
                        condition: amountFilter?.condition,
                      })}
                    </Text>
                  </ListItem>
                </UnorderedList>
              )}
            </Alert>
          </GridItem> */}
          <GridItem colSpan={3}>
            <Text color="gray.700" fontSize="r1" fontWeight={500}>
              Transfer Summary
            </Text>
          </GridItem>
          <GridItem colSpan={3}>
            <Box p="s16" borderRadius="br3" bgColor="highlight.500">
              <Grid templateColumns="repeat(2, 1fr)" rowGap="s24" columnGap="s16">
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

          <GridItem colSpan={3}>
            <SelectedLedgersTable
              data={
                (ledgerAccountsListData?.accounting?.ledgerBalanceTransfer?.getLedgerAccounts
                  ?.data as LedgerBalanceEntry[]) ?? []
              }
            />
          </GridItem>
        </>
      )}
    </FormSection>
  );
};
