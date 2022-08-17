import { useMemo } from 'react';
import { useRouter } from 'next/router';

import { useGetCoaListQuery } from '@coop/cbs/data-access';
import { Column, Table } from '@coop/shared/table';
import { useTranslation } from '@coop/shared/utils';

import { ActionPopoverComponent } from '../../../actionPopover/ActionPopover';

export const CoaAccountListTable = () => {
  const { t } = useTranslation();
  const router = useRouter();

  const { data, isFetching } = useGetCoaListQuery({
    filter: {
      active: true,
    },
  });

  const rowData = useMemo(
    () => data?.settings?.general?.chartsOfAccount?.accounts?.data ?? [],
    [data]
  );

  const popoverTitle = [
    {
      title: 'depositProductEdit',
      onClick: (id: string) => router.push(`/settings/general/test/edit/${id}`),
    },
  ];

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
        cell: (props) => {
          return <span>{props.getValue() ? `${props.getValue()}` : '-'}</span>;
        },
      },

      {
        header: t['settingsCoaTableAccountParentGroup'],
        accessorFn: (row) => row?.id,
      },

      {
        id: '_actions',
        header: '',
        accessorKey: 'actions',
        cell: (props) => (
          <ActionPopoverComponent items={popoverTitle} id={props?.row?.id} />
        ),
      },
    ],
    [t]
  );

  return <Table data={rowData} columns={columns} isLoading={isFetching} />;
};
