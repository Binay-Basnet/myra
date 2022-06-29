import { useMemo } from 'react';
import { useRouter } from 'next/router';

import { PopoverComponent, TableListPageHeader } from '@coop/myra/components';
import { useGetShareBalanceListQuery } from '@coop/shared/data-access';
import { Column, Table } from '@coop/shared/ui';
import { useTranslation } from '@coop/shared/utils';

export const ShareBalanceTable = () => {
  const { data, isFetching } = useGetShareBalanceListQuery();
  const { t } = useTranslation();
  const router = useRouter();

  const rowData = useMemo(() => data?.share.balance?.edges ?? [], [data]);

  const popoverTitle = ['shareRegisterTableViewMemberProfile'];

  const columns = useMemo<Column<typeof rowData[0]>[]>(
    () => [
      {
        Header: t['shareTableMemberId'],
        accessor: 'node.id',
        maxWidth: 4,
      },

      {
        Header: t['shareTableName'],
        accessor: 'node.member.name.local',
        width: '60%',
      },

      {
        Header: t['shareTableShareCount'],
        accessor: 'node.count',
        isNumeric: true,
      },
      {
        Header: t['shareTableShareAmount'],
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
    [router.locale]
  );

  return (
    <>
      <TableListPageHeader heading={'shareBalanceTable'} />

      <Table
        isLoading={isFetching}
        data={rowData ?? []}
        columns={columns}
        sort={true}
      />
    </>
  );
};
