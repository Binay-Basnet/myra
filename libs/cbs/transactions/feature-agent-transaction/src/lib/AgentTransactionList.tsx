import { useMemo } from 'react';
import { useRouter } from 'next/router';

import { Box, PageHeader, TablePopover, Text } from '@myra-ui';
import { Column, Table } from '@myra-ui/table';

import { useGetMrTransactionsListQuery } from '@coop/cbs/data-access';
import { localizedDate, ROUTES } from '@coop/cbs/utils';
import {
  amountConverter,
  featureCode,
  getFilterQuery,
  getPaginationQuery,
  getUrl,
  useTranslation,
} from '@coop/shared/utils';

export const AgentTransactionList = () => {
  const { t } = useTranslation();
  const router = useRouter();

  const { data, isFetching } = useGetMrTransactionsListQuery({
    pagination: getPaginationQuery(),
    filter: getFilterQuery(),
  });

  const rowData = useMemo(() => data?.transaction?.listMrTransaction?.edges ?? [], [data]);

  const columns = useMemo<Column<typeof rowData[0]>[]>(
    () => [
      {
        header: 'Date',
        accessorFn: (row) => row?.node?.date?.local,
        cell: (props) => localizedDate(props?.row?.original?.node?.date),
      },
      {
        header: 'MR Transaction ID',
        accessorFn: (row) => row?.node?.agentId,
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
        id: 'amount',
        header: 'Amount',
        accessorFn: (row) => (row?.node?.amount ? amountConverter(row?.node?.amount) : '-'),
        filterFn: 'amount',
        enableColumnFilter: true,
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
                      `${ROUTES.CBS_TRANS_MARKET_REPRESENTATIVE_TRANS_DETAILS}?id=${row?.agentId}&date=${row?.date}`
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
          router.push(
            `/${getUrl(router.pathname, 3)}/details?id=${row?.node?.agentId}&date=${
              row?.node?.date?.local
            }`
          )
        }
        noDataTitle="Market Representative Transaction"
        pagination={{
          total: data?.transaction?.listMrTransaction?.totalCount ?? 'Many',
          pageInfo: data?.transaction?.listMrTransaction?.pageInfo,
        }}
        menu="TRANSACTIONS"
      />
    </>
  );
};

export default AgentTransactionList;
