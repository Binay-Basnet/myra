import { useState } from 'react';

import { Box, FormSection } from '@myra-ui';

import { useGetLedgerForJvPostingQuery } from '@coop/cbs/data-access';
import { FormEditableTable } from '@coop/shared/form';

type JournalVouchersTableType = {
  ledgerId: string;
  accountId: string;
  cr: string;

  dr: string;
  description: string;
};

export const LedgerTable = () => {
  // const branchId = useAppSelector((state) => state?.auth?.user?.currentBranch?.id);
  const [searchTerm, setSearchTerm] = useState<string | null>(null);

  // const { watch } = useFormContext<CustomJournalVoucherInput>();

  // const entries = watch('entries');

  // const { crTotal, drTotal } = useMemo(() => {
  //   let tempCR = 0;
  //   let tempDR = 0;

  //   entries?.forEach((entry) => {
  //     tempCR += Number(entry?.crAmount ?? 0);
  //     tempDR += Number(entry?.drAmount ?? 0);
  //   });

  //   return { crTotal: tempCR, drTotal: tempDR };
  // }, [entries]);

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

  return (
    <FormSection header="My Ledger" subHeader="Select Source Ledger." templateColumns={1}>
      <Box display="flex" flexDir="column" gap="s12">
        <FormEditableTable<JournalVouchersTableType>
          name="selfEntries"
          searchPlaceholder="Search for Ledgers"
          columns={[
            {
              accessor: 'accountId',
              header: 'Ledger',
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
              accessor: 'dr',
              header: 'DR Amount',
              isNumeric: true,
              cellWidth: 'lg',
              getDisabled: (row) => !!row.cr,
            },
            {
              accessor: 'cr',
              header: 'CR Amount',
              isNumeric: true,
              cellWidth: 'lg',
              getDisabled: (row) => !!row.dr,
            },
            // {
            //   accessor: 'description',
            //   hidden: true,
            //   fieldType: 'textarea',
            //   header: 'Description',
            //   cellWidth: 'auto',
            //   colSpan: 3,
            // },
          ]}
        />
      </Box>
    </FormSection>
  );
};
