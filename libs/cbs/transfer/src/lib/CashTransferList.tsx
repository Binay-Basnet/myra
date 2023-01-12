import { Box, PageHeader, WIPState } from '@myra-ui';

import { featureCode } from '@coop/shared/utils';

/* eslint-disable-next-line */
export interface CashTransferListProps {}

export const CashTransferList = () => (
  // const { t } = useTranslation();

  // const { data, isFetching } = useGetTellerTransactionListDataQuery(
  //   {
  //     pagination: getRouterQuery({ type: ['PAGINATION'] }),
  //     filter: {
  //       type: [TellerTransferType.VaultToCash, TellerTransferType.CashToVault],
  //     },
  //   },
  //   {
  //     staleTime: 0,
  //   }
  // );

  // const rowData = useMemo(() => data?.transaction?.listTellerTransaction?.edges ?? [], [data]);

  // const columns = useMemo<Column<typeof rowData[0]>[]>(
  //   () => [
  //     {
  //       header: 'ID',
  //       accessorFn: (row) => row?.node?.transferCode,
  //     },
  //     {
  //       accessorFn: (row) =>
  //         row?.node?.transferType === TellerTransferType.VaultToCash
  //           ? row?.node?.destTeller?.local
  //           : row?.node?.srcTeller?.local,
  //       header: 'Sender Service Center',
  //       cell: (props) => (
  //         <Box display="flex" alignItems="center" gap="s12">
  //           <Text
  //             fontSize="s3"
  //             textTransform="capitalize"
  //             textOverflow="ellipsis"
  //             overflow="hidden"
  //           >
  //             {props.getValue() as string}
  //           </Text>
  //         </Box>
  //       ),
  //     },
  //     {
  //       header: 'Receiver Service Center',

  //       accessorFn: (row) => row?.node?.amount,
  //       meta: {
  //         isNumeric: true,
  //       },
  //     },
  //     {
  //       header: 'Approval Status',
  //       accessorFn: (row) => localizedDate(row?.node?.date),
  //     },
  //     {
  //       header: 'Cash Amount',

  //       accessorFn: (row) => row?.node?.amount,
  //       meta: {
  //         isNumeric: true,
  //       },
  //     },
  //     {
  //       header: 'Transfer Date',
  //       accessorFn: (row) => localizedDate(row?.node?.date),
  //     },
  //     {
  //       id: '_actions',
  //       header: '',
  //       accessorKey: 'actions',
  //       cell: (cell) => {
  //         const member = cell?.row?.original?.node;
  //         const memberData = { id: member?.ID };
  //         return <PopoverComponent items={[]} member={memberData} />;
  //       },
  //       meta: {
  //         width: '60px',
  //       },
  //     },
  //   ],
  //   [t]
  // );

  <>
    <PageHeader
      heading={`Service Center Cash Transfer - ${featureCode.vaultTransferList}`}
      // tabItems={tabList}
    />
    <Box mt="s48">
      <WIPState />
    </Box>

    {/* <Table
        data={rowData}
        getRowId={(row) => String(row?.node?.ID)}
        isLoading={isFetching}
        columns={columns}
        pagination={{
          total: data?.transaction?.listTellerTransaction?.totalCount ?? 'Many',
          pageInfo: data?.transaction?.listTellerTransaction?.pageInfo,
        }}
        noDataTitle="service center cash transfer list"
      /> */}
  </>
);

export default CashTransferList;
