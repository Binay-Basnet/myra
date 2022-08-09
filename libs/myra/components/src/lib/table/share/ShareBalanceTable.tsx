import { useMemo } from 'react';
import { useRouter } from 'next/router';

import { useGetShareBalanceListQuery } from '@coop/cbs/data-access';
import { PopoverComponent, TableListPageHeader } from '@coop/myra/components';
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
        accessor: 'node.member.name.local',
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
        Cell: ({ value }) => {
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
