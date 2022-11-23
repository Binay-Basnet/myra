import { useMemo } from 'react';

import { AccountingPageHeader } from '@coop/accounting/ui-components';
import { useExternalLoanListQuery } from '@coop/cbs/data-access';
import { Column, Table } from '@coop/shared/table';
import { TablePopover } from '@coop/shared/ui';
import { getRouterQuery, useTranslation } from '@coop/shared/utils';

/* eslint-disable-next-line */
export interface AccountingFeatureLoanProps {}

export const ExternalLoansList = () => {
  const { t } = useTranslation();

  const { data, isLoading } = useExternalLoanListQuery({
    pagination: getRouterQuery({ type: ['PAGINATION'] }),
  });

  const rowData = useMemo(() => data?.accounting?.externalLoan?.loan?.list?.edges ?? [], [data]);

  const columns = useMemo<Column<typeof rowData[0]>[]>(
    () => [
      {
        header: 'Entry ID',
        accessorFn: (row) => row?.node?.id,
      },
      {
        accessorFn: (row) => row?.node?.organizationName,
        header: 'Name of Organization',

        meta: {
          width: '60%',
        },
      },
      {
        header: 'Type',
        accessorFn: (row) => row?.node?.loanType,
        meta: {
          width: '30%',
        },
      },
      {
        header: 'Amount',
        accessorFn: (row) => row?.node?.amount,
        meta: {
          width: '30%',
        },
      },
      {
        header: 'Applied Date',
        accessorFn: (row) => row?.node?.appliedDate?.local,
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
      <AccountingPageHeader heading="Investments" />

      <Table isLoading={isLoading} data={rowData} columns={columns} />
    </>
  );
};
