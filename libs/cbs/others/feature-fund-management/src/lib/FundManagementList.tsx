import { useMemo } from 'react';

import { PageHeader, TablePopover } from '@myra-ui';
import { Column, Table } from '@myra-ui/table';

import { useProfitToFundManagementListQuery } from '@coop/cbs/data-access';
import { featureCode, getPaginationQuery, useTranslation } from '@coop/shared/utils';

export const FundManagementList = () => {
  const { t } = useTranslation();

  const { data, isFetching } = useProfitToFundManagementListQuery({
    pagination: getPaginationQuery(),
  });

  const rowData = useMemo(() => data?.profitToFundManagement?.list?.edges ?? [], [data]);

  const columns = useMemo<Column<typeof rowData[0]>[]>(
    () => [
      {
        header: 'ID',
        accessorFn: (row) => row?.node?.id,
        meta: {
          width: '1rem',
        },
      },
      {
        header: 'Fiscal Year',
        accessorFn: (row) => row?.node?.fiscalYear,
      },
      {
        header: 'Gross Profit',
        accessorFn: (row) => row?.node?.grossProfit,
      },
      {
        id: '_actions',
        header: '',
        cell: (props) =>
          props?.row?.original?.node && (
            <TablePopover
              node={props?.row?.original?.node}
              items={[]}
              // items={[
              //   {
              //     title: t['transDetailViewDetail'],
              //     onClick: (row) => {
              //       router.push(`/transactions/deposit/view?id=${row?.ID}`);
              //     },
              //   },
              // ]}
            />
          ),
        meta: {
          width: '3.125rem',
        },
      },
    ],
    []
  );

  return (
    <>
      <PageHeader
        heading={`Fund Management List - ${featureCode?.profitToFundManagementList}`}
        // tabItems={tabList}
      />

      <Table
        data={rowData}
        getRowId={(row) => String(row?.node?.id)}
        isLoading={isFetching}
        columns={columns}
        // rowOnClick={(row) => router.push(`/transactions/deposit/view?id=${row?.node?.ID}`)}
        pagination={{
          total: data?.profitToFundManagement?.list?.totalCount ?? 'Many',
          pageInfo: data?.profitToFundManagement?.list?.pageInfo,
        }}
        searchPlaceholder={t['depositListSearchDeposit']}
      />
    </>
  );
};

export default FundManagementList;
