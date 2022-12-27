import { useMemo } from 'react';
import { useRouter } from 'next/router';

import { TablePopover } from '@myra-ui';
import { Column, Table } from '@myra-ui/table';

import { useAppSelector, useGetCoaAccountListQuery } from '@coop/cbs/data-access';
import { getRouterQuery, useTranslation } from '@coop/shared/utils';

const accountClass = {
  EQUITY_AND_LIABILITIES: 'Equity and Liabilities',
  ASSETS: 'Assets',
  EXPENDITURE: 'Expenditure',
  INCOME: 'Income',
};

export const COAListView = () => {
  const router = useRouter();

  const { t } = useTranslation();
  const branch = useAppSelector((state) => state?.auth?.user?.branch);

  const { data: accountList, isFetching } = useGetCoaAccountListQuery({
    branchId: branch?.id,
    pagination: getRouterQuery({ type: ['PAGINATION'] }),
  });

  const accountListData = accountList?.settings?.chartsOfAccount?.coaAccountList?.edges;

  const rowData = useMemo(() => accountListData ?? [], [accountListData]);

  const columns = useMemo<Column<typeof rowData[0]>[]>(
    () => [
      {
        header: t['settingsCoaTableAccountCode'],
        accessorFn: (row) => row?.node?.accountCode,
      },
      {
        header: t['settingsCoaTableAccountName'],
        accessorFn: (row) => row?.node?.accountName?.local,
        meta: {
          width: '50%',
        },
      },
      {
        header: t['settingsCoaTableAccountClass'],
        accessorFn: (row) => row?.node?.accountClass,
        cell: (props) => (
          <span>
            {props.getValue()
              ? `${accountClass[props.getValue() as keyof typeof accountClass] as string}`
              : '-'}
          </span>
        ),
        meta: {
          width: '200px',
        },
      },

      {
        header: t['settingsCoaTableAccountParentGroup'],
        accessorFn: (row) => row?.node?.parentGroup?.local,
        meta: {
          width: '200px',
        },
      },

      {
        id: '_actions',
        header: '',
        accessorKey: 'actions',
        meta: {
          width: '60px',
        },
        cell: (props) =>
          props?.row && (
            <TablePopover
              items={[
                {
                  title: 'View Details',
                  onClick: (row) => {
                    router.push(
                      `/settings/general/charts-of-accounts/detail/${row?.node?.accountCode}`
                    );
                  },
                },
                { title: 'Edit Account' },
              ]}
              node={props.row.original}
            />
          ),
      },
    ],
    [t]
  );

  return (
    <Table
      data={rowData}
      columns={columns}
      isLoading={isFetching}
      rowOnClick={(row) =>
        router.push(`/settings/general/charts-of-accounts/detail/${row?.node?.accountCode}`)
      }
    />
  );
};
