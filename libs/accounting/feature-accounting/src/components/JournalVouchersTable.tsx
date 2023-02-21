import { useMemo, useState } from 'react';
import { useFormContext } from 'react-hook-form';
import { useDeepCompareEffect } from 'react-use';
import { useRouter } from 'next/router';

import { Box } from '@myra-ui';

import { TableOverview, TableOverviewColumnType } from '@coop/accounting/ui-components';
import { useGetLedgerForJvPostingQuery } from '@coop/cbs/data-access';
import { FormEditableTable } from '@coop/shared/form';

import { CustomJournalVoucherInput } from '../types';

type JournalVouchersTableType = {
  ledger: string;
  accountId: string;
  drAmount: string;
  crAmount: string;
  description: string;
};

export const JournalVouchersTable = () => {
  const router = useRouter();

  // const branchId = useAppSelector((state) => state?.auth?.user?.currentBranch?.id);
  const [searchTerm, setSearchTerm] = useState<string | null>(null);

  const { watch, setValue } = useFormContext<CustomJournalVoucherInput>();

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

  const redirectEntries = router?.query['entries']
    ? JSON.parse(router.query['entries'] as string)
    : [];

  const accountSearchOptions = useMemo(
    () =>
      accountListData?.map((account) => ({
        label: account?.node?.accountName?.local as string,
        value: account?.node?.accountCode as string,
      })),
    [accountListData]
  );

  const tableSummaryColumns: TableOverviewColumnType[] = [
    { label: 'Total', width: 'auto', isNumeric: true },
    { label: String(drTotal), width: 'lg', isNumeric: true },
    { label: String(crTotal), width: 'lg', isNumeric: true },
  ];

  useDeepCompareEffect(() => {
    if (redirectEntries?.length) {
      setValue(
        'entries',
        redirectEntries.map(
          (entry: {
            accountId: string;
            accountName: string;
            drAmount: string;
            crAmount: string;
          }) => ({
            accountId: { label: entry.accountName, value: entry.accountId },
            drAmount: entry.drAmount,
            crAmount: entry.crAmount,
          })
        )
      );
    }
  }, [redirectEntries]);

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
        Difference: NPR {drTotal - crTotal}
      </Box>
    </Box>
  );
};
