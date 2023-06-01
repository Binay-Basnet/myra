import { useMemo } from 'react';

import { PageHeader } from '@myra-ui';
import { Column, Table } from '@myra-ui/table';

import { useListAgentCollectionQuery } from '@coop/cbs/data-access';
import { localizedDate } from '@coop/cbs/utils';
import {
  amountConverter,
  getFilterQuery,
  getPaginationQuery,
  useTranslation,
} from '@coop/shared/utils';

export const MarketRepresentativeCollectionList = () => {
  const { t } = useTranslation();

  const { data, isFetching } = useListAgentCollectionQuery({
    pagination: getPaginationQuery(),
    filter: getFilterQuery(),
  });

  const rowData = useMemo(() => data?.agent?.listAgentCollection?.edges ?? [], [data]);

  const columns = useMemo<Column<typeof rowData[0]>[]>(
    () => [
      {
        header: 'Date',
        accessorFn: (row) => row?.node?.date?.local,
        cell: (props) => localizedDate(props?.row?.original?.node?.date),
      },
      {
        header: 'MR Transaction ID',
        accessorFn: (row) => row?.node?.id,
      },
      {
        accessorFn: (row) => row?.node?.mrName,
        header: 'Market Representative Name',
        // cell: (props) => (
        //   <Box display="flex" alignItems="center" gap="s12">
        //     <Avatar
        //       name={props.getValue() as string}
        //       src={props?.row?.original?.node?.agentPicUrl ?? ''}
        //     />
        //     <Text
        //       fontSize="s3"
        //       textTransform="capitalize"
        //       textOverflow="ellipsis"
        //       overflow="hidden"
        //     >
        //       {props.getValue() as string}
        //     </Text>
        //   </Box>
        // ),

        meta: {
          width: '60%',
        },
      },
      {
        id: 'amount',
        header: 'Amount',
        accessorFn: (row) => (row?.node?.amount ? amountConverter(row?.node?.amount) : '-'),
        filterFn: 'amount',
        enableColumnFilter: true,
      },
      // {
      //   id: '_actions',
      //   header: '',

      //   cell: (props) =>
      //     props?.row?.original?.node && (
      //       <TablePopover
      //         node={props?.row?.original?.node}
      //         items={[
      //           {
      //             title: t['transDetailViewDetail'],
      //             aclKey: 'CBS_MISCELLANEOUS_MARKET_REPRESENTATIVES',
      //             action: 'VIEW',
      //             onClick: (row) => {
      //               router.push(
      //                 `${ROUTES.CBS_TRANS_MARKET_REPRESENTATIVE_TRANS_DETAILS}?id=${row?.agentId}&date=${row?.date}`
      //               );
      //             },
      //           },
      //         ]}
      //       />
      //     ),
      //   meta: {
      //     width: '3.125rem',
      //   },
      // },
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
        noDataTitle="Market Representative Collection"
        pagination={{
          total: data?.agent?.listAgentCollection?.totalCount ?? 'Many',
          pageInfo: data?.agent?.listAgentCollection?.pageInfo,
        }}
      />
    </>
  );
};

export default MarketRepresentativeCollectionList;
