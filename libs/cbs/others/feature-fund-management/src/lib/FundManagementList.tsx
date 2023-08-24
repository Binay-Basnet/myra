import { useMemo } from 'react';
import { useRouter } from 'next/router';

import { PageHeader, TablePopover } from '@myra-ui';
import { Column, Table } from '@myra-ui/table';

import { useProfitToFundManagementListQuery } from '@coop/cbs/data-access';
import { ROUTES } from '@coop/cbs/utils';
import {
  debitCreditConverter,
  featureCode,
  getPaginationQuery,
  useTranslation,
} from '@coop/shared/utils';

export const FundManagementList = () => {
  const { t } = useTranslation();

  const router = useRouter();

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
        meta: {
          width: 'auto',
        },
      },
      {
        header: 'Gross Profit',
        accessorFn: (row) =>
          debitCreditConverter(
            row?.node?.grossProfit?.amount as string,
            row?.node?.grossProfit?.amountType as string
          ),
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
                  title: 'Edit',
                  onClick: (row) => {
                    router.push(`${ROUTES.CBS_OTHERS_FUND_MANAGEMENT_EDIT}?id=${row?.id}`);
                  },
                },
              ]}
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
