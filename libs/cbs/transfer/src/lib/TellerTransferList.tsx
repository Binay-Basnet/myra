import { useMemo } from 'react';
import { useRouter } from 'next/router';

import { Avatar, Box, PageHeader, Text } from '@myra-ui';
import { Column, Table } from '@myra-ui/table';

import { TellerTransferType, useGetTellerTransactionListDataQuery } from '@coop/cbs/data-access';
import { featureCode, getRouterQuery, useTranslation } from '@coop/shared/utils';

/* eslint-disable-next-line */
export interface TellerTransferListProps {}

export const TellerTransferList = () => {
  const { t } = useTranslation();

  const router = useRouter();

  const { data, isFetching } = useGetTellerTransactionListDataQuery({
    pagination: getRouterQuery({ type: ['PAGINATION'] }),
    filter: {
      type: [TellerTransferType.TellerTransfer],
    },
  });

  const rowData = useMemo(() => data?.transaction?.listTellerTransaction?.edges ?? [], [data]);

  const columns = useMemo<Column<typeof rowData[0]>[]>(
    () => [
      {
        header: 'Teller Transfer ID',
        accessorFn: (row) => row?.node?.ID,
      },
      {
        accessorFn: (row) => row?.node?.srcTeller?.local,
        header: 'Sender',
        cell: (props) => (
          <Box display="flex" alignItems="center" gap="s12">
            <Avatar
              name={props.getValue() as string}
              size="sm"
              src={props?.row?.original?.node?.srcProfilePicUrl ?? ''}
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
        accessorFn: (row) => row?.node?.destTeller?.local,
        header: 'Receiver',
        cell: (props) => (
          <Box display="flex" alignItems="center" gap="s12">
            <Avatar
              name={props.getValue() as string}
              size="sm"
              src={props?.row?.original?.node?.destProfilePicUrl ?? ''}
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
        header: 'Cash Amount',

        accessorFn: (row) => row?.node?.amount,
        meta: {
          isNumeric: true,
        },
      },
      {
        header: 'Transfer Date',
        accessorFn: (row) => row?.node?.date?.split(' ')[0] ?? 'N/A',
      },
      // {
      //   id: '_actions',
      //   header: '',
      //   accessorKey: 'actions',
      //   cell: (cell) => {
      //     const member = cell?.row?.original?.node;
      //     const memberData = { id: member?.ID };
      //     return <PopoverComponent items={[]} member={memberData} />;
      //   },
      //   meta: {
      //     width: '60px',
      //   },
      // },
    ],
    [t]
  );

  return (
    <>
      <PageHeader
        heading={`Teller Transfer - ${featureCode.tellerTransferList}`}
        // tabItems={tabList}
        button
        buttonTitle="Teller Transfer"
        onClick={() => router.push('/transfer/teller-transfer/add')}
      />

      <Table
        data={rowData}
        getRowId={(row) => String(row?.node?.ID)}
        isLoading={isFetching}
        columns={columns}
        pagination={{
          total: data?.transaction?.listTellerTransaction?.totalCount ?? 'Many',
          pageInfo: data?.transaction?.listTellerTransaction?.pageInfo,
        }}
        noDataTitle="teller transfer list"
      />
    </>
  );
};

export default TellerTransferList;
