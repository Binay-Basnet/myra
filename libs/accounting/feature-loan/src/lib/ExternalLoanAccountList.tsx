import { useMemo } from 'react';

import { AccountingPageHeader } from '@coop/accounting/ui-components';
import { useExternalLoanAccountListQuery } from '@coop/cbs/data-access';
import { Column, Table } from '@coop/shared/table';
import { TablePopover } from '@coop/shared/ui';
import { getRouterQuery, useTranslation } from '@coop/shared/utils';

/* eslint-disable-next-line */
export interface ExternalLoanAccountListProps {}

export const ExternalLoanAccountList = () => {
  const { t } = useTranslation();

  const { data, isLoading } = useExternalLoanAccountListQuery({
    pagination: getRouterQuery({ type: ['PAGINATION'] }),
  });

  const rowData = useMemo(() => data?.accounting?.externalLoan?.account?.list?.edges ?? [], [data]);

  const columns = useMemo<Column<typeof rowData[0]>[]>(
    () => [
      {
        accessorFn: (row) => row?.node?.name,
        header: 'Name',
        meta: {
          width: '60%',
        },
      },
      {
        header: 'Address',
        accessorFn: (row) => row?.node?.address,
        cell: (props) => {
          const address = props?.row?.original?.node?.address;
          return (
            <span>
              {address?.locality?.local} - {address?.wardNo},{address?.district?.local}
            </span>
          );
        },
        meta: {
          width: '30%',
        },
      },
      {
        header: 'Created Date',
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
      <AccountingPageHeader heading="External Loan Accounts" />

      <Table data={rowData} isLoading={isLoading} columns={columns} />
    </>
  );
};
