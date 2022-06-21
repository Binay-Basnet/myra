import { useMemo } from 'react';

import { PopoverComponent, TableListPageHeader } from '@coop/myra/components';
import { useGetShareBalanceListQuery } from '@coop/shared/data-access';
import { Column, Table } from '@coop/shared/ui';

export const ShareBalanceTable = () => {
  const { data, isLoading } = useGetShareBalanceListQuery();

  const rowData = useMemo(() => data?.share.balance?.edges ?? [], [data]);

  console.log(rowData);

  const popoverTitle = ['View Member Profile'];

  const columns = useMemo<Column<typeof rowData[0]>[]>(
    () => [
      {
        Header: 'Member Id',
        accessor: 'node.id',
        maxWidth: 4,
      },

      {
        Header: 'Name',
        accessor: 'node.member.name.local',
        width: '60%',
      },

      {
        Header: 'Share Count',
        accessor: 'node.shareCount',
        isNumeric: true,
      },
      {
        Header: 'Share Amount',
        accessor: 'node.balance',
        Cell: ({ value, row }) => {
          return <span>{Number(value).toLocaleString('en-IN')}</span>;
        },
        isNumeric: true,
      },

      {
        accessor: 'actions',
        Cell: () => <PopoverComponent title={popoverTitle} />,
      },
    ],
    []
  );

  return (
    <>
      <TableListPageHeader heading={'Share Balance'} />

      <Table
        isLoading={isLoading}
        data={rowData ?? []}
        columns={columns}
        sort={true}
      />
    </>
  );
};
