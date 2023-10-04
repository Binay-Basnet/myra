import { useMemo } from 'react';
import { useRouter } from 'next/router';

import { PageHeader, TablePopover } from '@myra-ui';
import { Column, Table } from '@myra-ui/table';

import { useShareDividendListQuery } from '@coop/cbs/data-access';
import { ROUTES } from '@coop/cbs/utils';
import { getPaginationQuery } from '@coop/shared/utils';

export const ShareDividendPostingList = () => {
  const router = useRouter();

  const { data, isFetching } = useShareDividendListQuery({
    pagination: getPaginationQuery(),
  });

  const rowData = useMemo(() => data?.shareDividend?.list?.edges ?? [], [data]);

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
        // meta: {
        //   width: 'auto',
        // },
      },
      {
        id: 'dividend-rate',
        header: 'Dividend Rate',
        cell: (row) => `${row?.cell?.row?.original?.node?.dividendRate} %`,
        meta: {
          isNumeric: true,
        },
      },
      {
        id: 'tax-rate',
        header: 'Tax Rate',
        cell: (row) => `${row?.cell?.row?.original?.node?.taxRate} %`,
        meta: {
          isNumeric: true,
        },
      },
      {
        header: 'Condition',
        accessorFn: (row) => row?.node?.condition,
      },
      {
        header: 'Transfer Treatment',
        accessorFn: (row) => row?.node?.treatment?.split('_').join(' '),
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
                  title: 'View Detail',
                  onClick: (row) => {
                    router.push(`${ROUTES.CBS_OTHERS_SHARE_DIVIDEND_POSTING_VIEW}?id=${row?.id}`);
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
        heading="Share Dividend Posting"
        // tabItems={tabList}
      />

      <Table
        data={rowData}
        getRowId={(row) => String(row?.node?.id)}
        isLoading={isFetching}
        columns={columns}
        pagination={{
          total: data?.shareDividend?.list?.totalCount ?? 'Many',
          pageInfo: data?.shareDividend?.list?.pageInfo,
        }}
      />
    </>
  );
};

export default ShareDividendPostingList;
