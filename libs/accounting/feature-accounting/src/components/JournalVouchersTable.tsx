import { useEffect, useMemo, useState } from 'react';
import { useFormContext } from 'react-hook-form';
import { useRouter } from 'next/router';

import { Box } from '@myra-ui';

import { TableOverview, TableOverviewColumnType } from '@coop/accounting/ui-components';
import { useGetCoaAccountDetailsQuery, useGetLedgerForJvPostingQuery } from '@coop/cbs/data-access';
import { FormEditableTable } from '@coop/shared/form';
import { debitCreditConverter } from '@coop/shared/utils';

import { CustomJournalVoucherInput } from '../types';

type JournalVouchersTableType = {
  ledger: string;
  accountId: string;
  drAmount: string;
  crAmount: string;
  description: string;
  balance: string;
};

export const JournalVouchersTable = () => {
  const router = useRouter();

  // const branchId = useAppSelector((state) => state?.auth?.user?.currentBranch?.id);
  const [searchTerm, setSearchTerm] = useState<string | null>(null);

  const { watch, reset, getValues } = useFormContext<CustomJournalVoucherInput>();

  const entries = watch('entries');

  const { crTotal, drTotal } = useMemo(() => {
    let tempCR = 0;
    let tempDR = 0;

    entries?.forEach((entry) => {
      tempCR += Number(entry?.crAmount ?? 0);
      tempDR += Number(entry?.drAmount ?? 0);
    });

    return { crTotal: tempCR, drTotal: tempDR };
  }, [entries]);

  const { data: accountList, isFetching } = useGetLedgerForJvPostingQuery({
    pagination: {
      after: '',
      first: 10,
    },
    filter: {
      name: searchTerm,
      filterMode: 'OR',
    },
  });

  const accountListData = accountList?.settings?.chartsOfAccount?.ledgersForJVPosting?.edges;

  // const { data: jvLedgersList } = useGetLedgerForJvPostingQuery({
  //   pagination: {
  //     after: '',
  //     first: -1,
  //   },
  // });

  // const allAccountsList = jvLedgersList?.settings?.chartsOfAccount?.ledgersForJVPosting?.edges;

  const redirectEntries = router?.query['entries']
    ? JSON.parse(router.query['entries'] as string)
    : [];

  const redirectEntriesMap = redirectEntries.map(
    (entry: { accountId: string; accountName: string; drAmount: string; crAmount: string }) => ({
      accountId: { label: entry.accountName, value: entry.accountId },
      drAmount: entry.drAmount,
      crAmount: entry.crAmount,
    })
  );

  const accountSearchOptions = useMemo(
    () =>
      accountListData?.map((account) => ({
        label: account?.node?.accountName?.local as string,
        value: account?.node?.accountCode as string,
      })),
    [isFetching]
  );

  const tableSummaryColumns: TableOverviewColumnType[] = [
    { label: 'Total', width: 'auto', isNumeric: true },
    { label: drTotal?.toFixed(2), width: 'lg', isNumeric: true },
    { label: crTotal?.toFixed(2), width: 'lg', isNumeric: true },
  ];

  useEffect(() => {
    if (redirectEntriesMap?.length) {
      reset({
        ...getValues(),
        entries: redirectEntriesMap,
      });
    }
  }, [router?.query['entries']]);

  return (
    <Box display="flex" flexDir="column" gap="s12">
      <FormEditableTable<JournalVouchersTableType>
        name="entries"
        searchPlaceholder="Search for ledgers"
        columns={[
          {
            accessor: 'accountId',
            header: 'Ledger',
            fieldType: 'search',
            searchOptions: accountSearchOptions,
            searchLoading: isFetching,
            searchCallback: (newSearch) => {
              setSearchTerm(newSearch);
            },
            cellWidth: 'lg',
          },
          {
            accessor: 'balance',
            header: 'Balance',
            // cell: (row) => {
            //   const selectedLedger = allAccountsList?.find(
            //     (ledger) =>
            //       ledger?.node?.accountCode ===
            //       (row?.accountId as unknown as { value: string })?.value
            //   );

            //   return debitCreditConverter(
            //     selectedLedger?.node?.balance as string,
            //     selectedLedger?.node?.balanceType as string
            //   );
            // },
            cell: (row) => (
              <LedgerBalance ledgerId={(row?.accountId as unknown as { value: string })?.value} />
            ),
            cellWidth: 'lg',
            isNumeric: true,
          },
          {
            accessor: 'drAmount',
            header: 'DR Amount',
            isNumeric: true,
            cellWidth: 'lg',
            getDisabled: (row) => !!row.crAmount,
          },
          {
            accessor: 'crAmount',
            header: 'CR Amount',
            isNumeric: true,
            getDisabled: (row) => !!row.drAmount,
            cellWidth: 'lg',
          },
          {
            accessor: 'description',
            hidden: true,
            fieldType: 'textarea',
            header: 'Description',
            cellWidth: 'auto',
            colSpan: 3,
          },
        ]}
      />

      <TableOverview columns={tableSummaryColumns} />

      <Box w="100%" textAlign="right" fontSize="s3" fontWeight={500} color="gray.700">
        Difference: NPR {(drTotal - crTotal).toFixed(2)}
      </Box>
    </Box>
  );
};

const LedgerBalance = ({ ledgerId }: { ledgerId: string }) => {
  const { data: accountQueryData } = useGetCoaAccountDetailsQuery(
    {
      id: ledgerId as string,
    },
    {
      enabled: !!ledgerId,
    }
  );

  const accountDetail = accountQueryData?.settings?.chartsOfAccount?.coaAccountDetails?.data;

  return (
    <Box display="flex" justifyContent="flex-end">
      {debitCreditConverter(
        accountDetail?.overview?.closingBalance as string,
        accountDetail?.overview?.balanceType as string
      )}
    </Box>
  );
};
