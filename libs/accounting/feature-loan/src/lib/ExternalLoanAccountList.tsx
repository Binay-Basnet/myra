import { useEffect, useMemo } from 'react';

import { AccountingPageHeader } from '@coop/accounting/ui-components';
import { formatTableAddress } from '@coop/cbs/utils';
import { Column, Table } from '@myra-ui/table';
import { TablePopover } from '@myra-ui';
import { useTranslation } from '@coop/shared/utils';

import { useExternalLoan } from '../hooks/useExternalLoan';

/* eslint-disable-next-line */
export interface ExternalLoanAccountListProps {}

export const ExternalLoanAccountList = () => {
  const { t } = useTranslation();

  const { loanAccountList, isLoanAccountLoading, refetchLoanAccount } = useExternalLoan();

  const rowData = useMemo(() => loanAccountList ?? [], [loanAccountList]);

  const columns = useMemo<Column<typeof rowData[0]>[]>(
    () => [
      {
        accessorFn: (row) => row?.name,
        header: 'Name',
        meta: {
          width: '60%',
        },
      },
      {
        header: 'Address',
        accessorFn: (row) => row?.address,
        cell: (props) => {
          const address = props?.row?.original?.address;
          return <span>{formatTableAddress(address)}</span>;
        },
        meta: {
          width: '30%',
        },
      },
      {
        header: 'Created Date',
        accessorFn: (row) => row?.date,
        meta: {
          width: '30%',
        },
      },
      {
        id: '_actions',
        header: '',
        cell: (props) =>
          props?.row?.original && (
            <TablePopover
              node={props?.row?.original}
              items={[
                {
                  title: t['transDetailViewDetail'],
                },
              ]}
            />
          ),
        meta: {
          width: '50px',
        },
      },
    ],
    [t]
  );

  useEffect(() => {
    refetchLoanAccount();
  }, [refetchLoanAccount]);

  return (
    <>
      <AccountingPageHeader heading="External Loan Accounts" />

      <Table data={rowData} isLoading={isLoanAccountLoading} columns={columns} />
    </>
  );
};
