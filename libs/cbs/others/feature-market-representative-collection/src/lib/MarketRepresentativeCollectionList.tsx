import { useMemo } from 'react';
import { useRouter } from 'next/router';

import { PageHeader } from '@myra-ui';
import { Column, Table, TablePopover } from '@myra-ui/table';

import { Arrange, useAppSelector, useListMrSubmissionListQuery } from '@coop/cbs/data-access';
import { localizedDate, ROUTES } from '@coop/cbs/utils';
import { amountConverter, getPaginationQuery, useTranslation } from '@coop/shared/utils';

export const MarketRepresentativeCollectionList = () => {
  const { t } = useTranslation();

  const userId = useAppSelector((state) => state.auth?.user?.id);

  const router = useRouter();

  const { data, isFetching } = useListMrSubmissionListQuery({
    pagination: {
      ...getPaginationQuery(),
      order: {
        column: 'submissionDate',
        arrange: Arrange.Desc,
      },
    },
    filter: {
      orConditions: [{ andConditions: [{ column: 'mrId', comparator: 'EqualTo', value: userId }] }],
    },
  });

  const rowData = useMemo(() => data?.agent?.listMRSubmissionList?.edges ?? [], [data]);

  const columns = useMemo<Column<typeof rowData[0]>[]>(
    () => [
      {
        header: 'Date',
        accessorFn: (row) => row?.node?.submissionDate?.local,
        cell: (props) => localizedDate(props?.row?.original?.node?.submissionDate),
        // meta: {
        //   orderId: 'submissionDate',
        // },
        // enableSorting: true,
      },
      {
        header: 'MR Transaction ID',
        accessorFn: (row) => row?.node?.id,
      },
      {
        accessorFn: (row) => row?.node?.mrName,
        header: 'Market Representative Name',

        meta: {
          width: '60%',
        },
      },
      {
        id: 'totalAmount',
        header: 'Amount Collected',
        cell: (props) => amountConverter(props?.row?.original?.node?.totalAmount || 0),
      },
      {
        id: 'totalFine',
        header: 'Fine Collected',
        cell: (props) => amountConverter(props?.row?.original?.node?.totalFine || 0),
      },
      {
        header: 'Status',
        accessorFn: (row) => row?.node?.status,
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
                  title: t['transDetailViewDetail'],
                  aclKey: 'CBS_MISCELLANEOUS_MARKET_REPRESENTATIVES',
                  action: 'VIEW',
                  onClick: (row) => {
                    router.push(
                      `${ROUTES.CBS_OTHERS_MARKET_REPRESENTATIVE_COLLECTION_DETAILS}?id=${row?.id}`
                    );
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
    [t]
  );

  return (
    <>
      <PageHeader heading="Market Representative Collection" />

      <Table
        data={rowData}
        getRowId={(row) => String(row?.node?.id)}
        isLoading={isFetching}
        columns={columns}
        // rowOnClick={(row) =>
        //   router.push(
        //     `/${getUrl(router.pathname, 3)}/details?id=${row?.node?.agentId}&date=${
        //       row?.node?.date?.local
        //     }`
        //   )
        // }
        rowOnClick={(row) =>
          router.push(
            `${ROUTES.CBS_OTHERS_MARKET_REPRESENTATIVE_COLLECTION_DETAILS}?id=${row?.node?.id}`
          )
        }
        noDataTitle="Market Representative Collection"
        pagination={{
          total: data?.agent?.listMRSubmissionList?.totalCount ?? 'Many',
          pageInfo: data?.agent?.listMRSubmissionList?.pageInfo,
        }}
      />
    </>
  );
};

export default MarketRepresentativeCollectionList;
