import { useMemo } from 'react';
import { useRouter } from 'next/router';

import { Avatar, Box, PageHeader, TablePopover, Text } from '@myra-ui';
import { Column, Table } from '@myra-ui/table';

import { Filter_Mode, useGetDepositListDataQuery } from '@coop/cbs/data-access';
import { ROUTES } from '@coop/cbs/utils';
import {
  amountConverter,
  featureCode,
  getRouterQuery,
  getUrl,
  useTranslation,
} from '@coop/shared/utils';

// const MEMBER_TAB_ITEMS = [
//   {
//     title: 'memberNavActive',
//     key: 'APPROVED',
//   },
//   {
//     title: 'memberNavInactive',
//     key: 'VALIDATED',
//   },
//   {
//     title: 'memberNavDraft',
//     key: 'DRAFT',
//   },
// ];

export const AgentTransactionList = () => {
  const { t } = useTranslation();
  const router = useRouter();

  // const { data, isFetching } = useGetMemberListQuery({
  //   pagination: getRouterQuery({ type: ['PAGINATION'] }),
  //   filter: {
  //     objState: (router.query['objState'] ?? ObjState.Approved) as ObjState,
  //   },
  // });
  const searchTerm = router?.query['search'] as string;

  const { data, isFetching } = useGetDepositListDataQuery(
    {
      pagination: getRouterQuery({ type: ['PAGINATION'] }),
      filter: {
        depositedBy: 'agent',
        marketRepName: searchTerm,
        marketRepId: searchTerm,
        filterMode: Filter_Mode.Or,
      },
    },
    {
      staleTime: 0,
    }
  );

  const rowData = useMemo(() => data?.transaction?.listDeposit?.edges ?? [], [data]);

  const columns = useMemo<Column<typeof rowData[0]>[]>(
    () => [
      {
        header: 'Date',
        accessorFn: (row) => row?.node?.date?.local,
        // meta: {
        //   width: '20%',
        // },
      },
      {
        header: 'MR Transaction ID',
        accessorFn: (row) => row?.node?.ID,
      },
      {
        accessorFn: (row) => row?.node?.agentName,
        header: 'Market Representative Name',
        cell: (props) => (
          <Box display="flex" alignItems="center" gap="s12">
            <Avatar
              name={props.getValue() as string}
              src={props?.row?.original?.node?.agentPicUrl ?? ''}
            />
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

        meta: {
          width: '60%',
        },
      },
      {
        header: 'Amount',
        accessorFn: (row) => (row?.node?.amount ? amountConverter(row?.node?.amount) : '-'),
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
          width: '50px',
        },
      },
    ],
    [t]
  );

  return (
    <>
      <PageHeader
        heading={`Market Representative Transaction - ${featureCode?.marketRepresentativeTransactionsList}`}
      />

      <Table
        data={rowData}
        getRowId={(row) => String(row?.node?.ID)}
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
          total: data?.transaction?.listDeposit?.totalCount ?? 'Many',
          pageInfo: data?.transaction?.listDeposit?.pageInfo,
        }}
      />
    </>
  );
};

export default AgentTransactionList;
