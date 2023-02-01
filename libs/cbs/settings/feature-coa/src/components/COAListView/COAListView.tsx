import { useMemo } from 'react';
import { useRouter } from 'next/router';

import { TablePopover, Text, Tooltip } from '@myra-ui';
import { Column, Table } from '@myra-ui/table';

import { Filter_Mode, useGetCoaAccountListQuery } from '@coop/cbs/data-access';
import { getRouterQuery, getUrl, useTranslation } from '@coop/shared/utils';

// const accountClass = {
//   EQUITY_AND_LIABILITIES: 'Equity and Liabilities',
//   ASSETS: 'Assets',
//   EXPENDITURE: 'Expenditure',
//   INCOME: 'Income',
// };

export const COAListView = () => {
  const router = useRouter();

  const { t } = useTranslation();
  // const branch = useAppSelector((state) => state?.auth?.user?.currentBranch);
  const searchTerm = router?.query['search'] as string;

  const { data: accountList, isFetching } = useGetCoaAccountListQuery({
    pagination: {
      ...getRouterQuery({ type: ['PAGINATION'] }),
    },
    filter: {
      name: searchTerm,
      filterMode: Filter_Mode.Or,
    },
  });

  const accountListData = accountList?.settings?.chartsOfAccount?.coaAccountList?.edges;

  const rowData = useMemo(() => accountListData ?? [], [accountListData]);

  const columns = useMemo<Column<typeof rowData[0]>[]>(
    () => [
      // {
      //   header: t['settingsCoaTableAccountCode'],
      //   accessorFn: (row) => row?.node?.accountCode,
      // },
      {
        header: t['settingsCoaTableAccountName'],
        accessorFn: (row) => row?.node?.accountName?.local,
        cell: (props) => (
          <Tooltip
            title={
              props?.row?.original?.node?.accountName?.local
                ?.replace(/_/gi, ' ')
                .toLowerCase() as string
            }
          />
        ),
        meta: {
          width: '50%',
        },
      },
      {
        header: 'Service Center',
        accessorFn: (row) => row?.node?.branch,
      },
      {
        header: t['settingsCoaTableAccountClass'],
        accessorFn: (row) => row?.node?.accountClass,
        cell: (props) => (
          <Text textTransform="capitalize">
            {props.getValue()
              ? props?.row?.original?.node?.accountClass?.replace(/_/gi, ' ').toLowerCase()
              : '-'}
          </Text>
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
                  aclKey: 'SETTINGS_COA',
                  action: 'VIEW',
                  onClick: (row) => {
                    router.push(
                      `/${getUrl(router.pathname, 3)}/details?id=${row?.node?.accountCode}`
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
        router.push(`/${getUrl(router.pathname, 3)}/details?id=${row?.node?.accountCode}`)
      }
      pagination={{
        total: accountList?.settings?.chartsOfAccount?.coaAccountList?.totalCount ?? 'Many',
        pageInfo: accountList?.settings?.chartsOfAccount?.coaAccountList?.pageInfo,
      }}
    />
  );
};
