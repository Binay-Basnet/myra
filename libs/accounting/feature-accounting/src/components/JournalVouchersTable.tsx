import { useMemo, useState } from 'react';
import { useFormContext } from 'react-hook-form';

import { Box } from '@myra-ui';

import { TableOverview, TableOverviewColumnType } from '@coop/accounting/ui-components';
import { useGetCoaAccountsUnderLeafListQuery } from '@coop/cbs/data-access';
import { COASelectModal } from '@coop/shared/components';
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
  const [parentId, setParentId] = useState<string>('');

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

  const { refetch } = useGetCoaAccountsUnderLeafListQuery({ parentId });

  const getAccountsList = async (pId: string) =>
    new Promise<{ label: string; value: string }[]>((resolve) => {
      setParentId(pId);

      refetch().then(({ data }) => {
        resolve(
          data?.settings?.chartsOfAccount?.accountsUnderLeaf?.map((account) => ({
            label: account?.name as string,
            value: account?.accountId as string,
          })) ?? []
        );
      });
    });

  const tableSummaryColumns: TableOverviewColumnType[] = [
    { label: 'Total', width: 'auto', isNumeric: true },
    { label: String(drTotal), width: 'lg', isNumeric: true },
    { label: String(crTotal), width: 'lg', isNumeric: true },
  ];

  return (
    <Box display="flex" flexDir="column" gap="s12">
      <FormEditableTable<JournalVouchersTableType>
        name="entries"
        columns={[
          {
            accessor: 'ledger',
            cellWidth: 'lg',
            header: 'Ledger',
            fieldType: 'modal',
            modal: COASelectModal,
          },
          {
            accessor: 'accountId',
            header: 'Account',
            loadOptions: (row) => getAccountsList(row?.ledger),
            fieldType: 'select',
            cellWidth: 'auto',
          },
          {
            accessor: 'drAmount',
            header: 'DR Amount',
            isNumeric: true,
            cellWidth: 'lg',
          },
          {
            accessor: 'crAmount',
            header: 'CR Amount',
            isNumeric: true,
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
