import { useMemo } from 'react';

import { useGetCoaListQuery } from '@coop/cbs/data-access';
import { Column, Table } from '@coop/shared/table';
import { useTranslation } from '@coop/shared/utils';

export const COAListView = () => {
  const { t } = useTranslation();

  const { data, isFetching } = useGetCoaListQuery({
    filter: {
      active: true,
    },
  });

  const rowData = useMemo(
    () => data?.settings?.general?.chartsOfAccount?.accounts?.data ?? [],
    [data]
  );

  const columns = useMemo<Column<typeof rowData[0]>[]>(
    () => [
      {
        header: t['settingsCoaTableAccountCode'],
        accessorFn: (row) => row?.accountCode,
      },
      {
        header: t['settingsCoaTableAccountName'],
        accessorFn: (row) => row?.name?.en,
        meta: {
          width: '50%',
        },
      },
      {
        header: t['settingsCoaTableAccountClass'],
        accessorFn: (row) => row?.accountClass,
        cell: (props) => <span>{props.getValue() ? `${props.getValue() as string}` : '-'}</span>,
      },

      {
        header: t['settingsCoaTableAccountParentGroup'],
        accessorFn: (row) => row?.id,
      },
    ],
    [t]
  );

  return (
    <>
      <Table data={rowData} columns={columns} isLoading={isFetching} />{' '}
    </>
  );
};
