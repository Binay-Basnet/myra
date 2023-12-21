import { useMemo } from 'react';
import { useRouter } from 'next/router';

import { Box, PageHeader, TablePopover, Text } from '@myra-ui';
import { Column, Table } from '@myra-ui/table';

import { TodayListStatus, useListMrSubmissionListQuery } from '@coop/cbs/data-access';
import { localizedDate, ROUTES } from '@coop/cbs/utils';
import {
  featureCode,
  getFilterQuery,
  getPaginationQuery,
  useTranslation,
} from '@coop/shared/utils';

export const AgentTransactionList = () => {
  const { t } = useTranslation();
  const router = useRouter();

  const { data, isFetching } = useListMrSubmissionListQuery({
    pagination: getPaginationQuery(),
    filter: {
      ...getFilterQuery(),
      orConditions: [
        {
          andConditions: [
            {
              column: 'status',
              comparator: 'IN',
              value: [TodayListStatus.Completed, TodayListStatus.Failed, TodayListStatus.Pending],
            },
          ],
        },
      ],
    },
  });

  const rowData = useMemo(() => data?.agent?.listMRSubmissionList?.edges ?? [], [data]);

  const columns = useMemo<Column<typeof rowData[0]>[]>(
    () => [
      {
        id: 'date',
        header: 'Date',
        accessorFn: (row) => row?.node?.date?.local,
        cell: (props) => localizedDate(props?.row?.original?.node?.date),
        enableSorting: true,
      },
      {
        header: 'MR Transaction ID',
        accessorFn: (row) => row?.node?.mrId,
      },
      {
        accessorFn: (row) => row?.node?.mrName,
        header: 'Market Representative Name',
        cell: (props) => (
          <Box display="flex" alignItems="center" gap="s12">
            <Text
              fontSize="s3"
              textTransform="capitalize"
              textOverflow="ellipsis"
              overflow="hidden"
            >
              {props.getValue() as string}
            </Text>
          </Box>
        ),
      },
      {
        header: 'Status',
        accessorFn: (row) => row?.node?.status,
      },
      // {
      //   id: 'amount',
      //   header: 'Amount',
      //   accessorFn: (row) => (row?.node?.amount ? amountConverter(row?.node?.amount) : '-'),
      //   filterFn: 'amount',
      //   enableColumnFilter: true,
      // },
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
                      `${ROUTES.CBS_TRANS_MARKET_REPRESENTATIVE_TRANS_DETAILS}?id=${row?.id}`
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
      <PageHeader
        heading={`Market Representative Transaction - ${featureCode?.marketRepresentativeTransactionList}`}
      />

      <Table
        data={rowData}
        getRowId={(row) => String(row?.node?.id)}
        isLoading={isFetching}
        columns={columns}
        rowOnClick={(row) =>
          router.push(`${ROUTES.CBS_TRANS_MARKET_REPRESENTATIVE_TRANS_DETAILS}?id=${row?.node?.id}`)
        }
        noDataTitle="Market Representative Transaction"
        pagination={{
          total: data?.agent?.listMRSubmissionList?.totalCount ?? 'Many',
          pageInfo: data?.agent?.listMRSubmissionList?.pageInfo,
        }}
        menu="TRANSACTIONS"
      />
    </>
  );
};

export default AgentTransactionList;
