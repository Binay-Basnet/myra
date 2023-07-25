import { useMemo } from 'react';
import { useRouter } from 'next/router';

import { TablePopover, Text, Tooltip } from '@myra-ui';
import { Column, Table } from '@myra-ui/table';

import { useGetCoaAccountListQuery, useGetMemberFilterMappingQuery } from '@coop/cbs/data-access';
import {
  amountConverter,
  getFilterQuery,
  getPaginationQuery,
  getUrl,
  useTranslation,
} from '@coop/shared/utils';

const accountClass = {
  EQUITY_AND_LIABILITIES: 'Equity and Liabilities',
  ASSETS: 'Assets',
  EXPENDITURE: 'Expenditure',
  INCOME: 'Income',
  OFF_BALANCE_SHEET: 'Off Balance Sheet',
};

export const COAListView = () => {
  const router = useRouter();

  const { t } = useTranslation();

  const { data: filterMapping } = useGetMemberFilterMappingQuery();

  const { data: accountList, isFetching } = useGetCoaAccountListQuery({
    pagination: getPaginationQuery(),
    filter: getFilterQuery(),
  });

  const accountListData = accountList?.settings?.chartsOfAccount?.coaAccountList?.edges;

  const rowData = useMemo(() => accountListData ?? [], [accountListData]);

  const columns = useMemo<Column<typeof rowData[0]>[]>(
    () => [
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
        id: 'branch',
        header: 'Service Center',
        accessorFn: (row) => row?.node?.branch,
        enableColumnFilter: true,
        meta: {
          filterMaps: {
            list: filterMapping?.members?.filterMapping?.serviceCenter,
          },
        },
      },
      {
        id: 'accountClass',
        header: t['settingsCoaTableAccountClass'],
        accessorFn: (row) => row?.node?.accountClass,
        cell: (props) => (
          <Text textTransform="capitalize">
            {props.getValue()
              ? props?.row?.original?.node?.accountClass?.replace(/_/gi, ' ').toLowerCase()
              : '-'}
          </Text>
        ),
        enableColumnFilter: true,

        meta: {
          width: '200px',
          filterMaps: {
            list: Object.keys(accountClass)?.map((account) => ({
              label: accountClass[account as keyof typeof accountClass],
              value: account,
            })),
          },
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
        id: 'balance',
        header: 'Balance',
        accessorFn: (row) => amountConverter(row?.node?.balance as string),
        enableColumnFilter: true,
        filterFn: 'amount',
        meta: {
          width: '200px',
          isNumeric: true,
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
    [t, filterMapping?.members?.filterMapping?.serviceCenter]
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
