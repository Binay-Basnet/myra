import { useMemo } from 'react';

import { AccountingPageHeader } from '@coop/accounting/ui-components';
import { useExternalLoanPaymentListQuery } from '@coop/cbs/data-access';
import { Column, Table } from '@coop/shared/table';
import { TablePopover } from '@coop/shared/ui';
import { getRouterQuery, useTranslation } from '@coop/shared/utils';

/* eslint-disable-next-line */
export interface ExternalLoanPaymentListProps {}

export const ExternalLoanPaymentList = () => {
  const { t } = useTranslation();

  const { data, isLoading } = useExternalLoanPaymentListQuery({
    pagination: getRouterQuery({ type: ['PAGINATION'] }),
  });

  const rowData = useMemo(() => data?.accounting?.externalLoan?.payment?.list?.edges ?? [], [data]);

  const columns = useMemo<Column<typeof rowData[0]>[]>(
    () => [
      {
        header: 'Loan',
        accessorFn: (row) => row?.node?.loanName,
      },
      {
        accessorFn: (row) => row?.node?.paymentMode,
        header: 'Payment Mode',

        meta: {
          width: '60%',
        },
      },
      {
        accessorFn: (row) => row?.node?.amount,
        header: 'Amount',
      },
      {
        header: 'Date',
        accessorFn: (row) => row?.node?.createdDate?.local,
        meta: {
          width: '30%',
        },
      },
      {
        id: '_actions',
        header: '',
        cell: (props) =>
          props?.row?.original?.node && (
            <TablePopover
              node={props?.row?.original?.node}
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
  return (
    <>
      <AccountingPageHeader heading="External Loan Payment" />

      <Table data={rowData} isLoading={isLoading} columns={columns} />
    </>
  );
};
