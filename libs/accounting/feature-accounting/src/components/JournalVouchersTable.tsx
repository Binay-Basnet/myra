import { useMemo, useState } from 'react';
import { useFormContext } from 'react-hook-form';

import { Box } from '@myra-ui';

import { TableOverview, TableOverviewColumnType } from '@coop/accounting/ui-components';
import { useGetCoaAccountListQuery } from '@coop/cbs/data-access';
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
  const [searchTerm, setSearchTerm] = useState<string | null>(null);

  const { watch } = useFormContext<CustomJournalVoucherInput>();

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

  const { data: accountList, isFetching } = useGetCoaAccountListQuery({
    pagination: {
      after: '',
      first: 10,
    },

    flag: 'JOURNAL_VOUCHER',
    filter: {
      ledgerId: searchTerm,
      name: searchTerm,
      filterMode: 'OR',
    },
  });

  const accountListData = accountList?.settings?.chartsOfAccount?.coaAccountList?.edges;

  const tableSummaryColumns: TableOverviewColumnType[] = [
    { label: 'Total', width: 'auto', isNumeric: true },
    { label: String(drTotal), width: 'lg', isNumeric: true },
    { label: String(crTotal), width: 'lg', isNumeric: true },
  ];

  return (
    <Box display="flex" flexDir="column" gap="s12">
      <FormEditableTable<JournalVouchersTableType>
        name="entries"
        searchPlaceholder="Search for Accounts"
        columns={[
          {
            accessor: 'accountId',
            header: 'Account',
            fieldType: 'search',
            searchOptions: accountListData?.map((account) => ({
              label: account?.node?.accountName?.local as string,
              value: account?.node?.accountCode as string,
            })),
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
