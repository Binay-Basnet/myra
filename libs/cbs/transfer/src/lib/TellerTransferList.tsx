import { useMemo } from 'react';
import { useRouter } from 'next/router';
import { useDisclosure } from '@chakra-ui/react';

import { Avatar, Box, PageHeader, Text } from '@myra-ui';
import { ApprovalStatusCell, Column, Table, TablePopover } from '@myra-ui/table';

import {
  TellerActivityEntry,
  TellerActivityState,
  TellerTransferType,
  useGetSettingsUserListDataQuery,
  useGetTellerTransactionListDataQuery,
} from '@coop/cbs/data-access';
import { localizedDate, ROUTES } from '@coop/cbs/utils';
import {
  amountConverter,
  featureCode,
  getFilterQuery,
  getPaginationQuery,
  getUrl,
  useTranslation,
} from '@coop/shared/utils';

import { TellerTransferApproveModal } from '../components';

/* eslint-disable-next-line */
export interface TellerTransferListProps {}

const tellerActivityVariant: Record<TellerActivityState, 'success' | 'failure' | 'pending'> = {
  [TellerActivityState.Approved]: 'success',
  [TellerActivityState.Pending]: 'pending',
  [TellerActivityState.Cancelled]: 'failure',
};

export const TellerTransferList = () => {
  const { data: userList } = useGetSettingsUserListDataQuery({
    paginate: { after: '', first: -1 },
  });
  const { t } = useTranslation();

  const router = useRouter();

  const modalProps = useDisclosure();

  const { data, isFetching } = useGetTellerTransactionListDataQuery({
    pagination: getPaginationQuery(),
    filter: getFilterQuery({
      type: {
        compare: '=',
        value: TellerTransferType.TellerTransfer,
      },
    }),
  });

  const rowData = useMemo(() => data?.transaction?.listTellerTransaction?.edges ?? [], [data]);

  const columns = useMemo<Column<typeof rowData[0]>[]>(
    () => [
      {
        id: 'date',
        header: 'Transfer Date',
        accessorFn: (row) => localizedDate(row?.node?.date),
        cell: (props) => localizedDate(props?.row?.original?.node?.date),
        enableColumnFilter: true,
        filterFn: 'dateTime',
      },
      {
        header: 'Transfer Code',
        accessorFn: (row) => row?.node?.transferCode,
      },
      {
        id: 'srcTeller',
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
        enableColumnFilter: true,

        meta: {
          width: '25%',
          filterMaps: {
            list: userList?.settings?.myraUser?.list?.edges?.map((e) => ({
              label: e?.node?.name,
              value: e?.node?.id,
            })),
          },
        },
      },
      {
        id: 'destTeller',
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
        enableColumnFilter: true,

        meta: {
          width: '25%',
          filterMaps: {
            list: userList?.settings?.myraUser?.list?.edges?.map((e) => ({
              label: e?.node?.name,
              value: e?.node?.id,
            })),
          },
        },
      },
      {
        id: 'transferStatus',
        header: 'Approval Status',
        accessorFn: (row) => row?.node?.transferState,
        enableColumnFilter: true,

        cell: (props) => (
          <ApprovalStatusCell
            status={props.row.original?.node?.transferState as string}
            variant={
              tellerActivityVariant[props.row.original?.node?.transferState as TellerActivityState]
            }
          />
        ),
        meta: {
          filterMaps: {
            list: [
              { label: 'Success', value: TellerActivityState.Approved },
              { label: 'Failed', value: TellerActivityState.Cancelled },
              { label: 'Pending', value: TellerActivityState.Pending },
            ],
          },
        },
      },
      {
        header: 'Transaction Service Center',
        accessorFn: (row) => row?.node?.transactionBranchName,
      },
      {
        id: 'amount',
        header: 'Amount',

        accessorFn: (row) => amountConverter(row?.node?.amount as string),
        enableColumnFilter: true,
        filterFn: 'amount',
        meta: {
          isNumeric: true,
        },
      },

      {
        id: '_actions',
        header: '',
        cell: (props) => (
          <TablePopover
            node={props?.row?.original?.node}
            items={[
              {
                title: 'viewDetails',
                aclKey: 'CBS_TRANSFERS_TELLER_TRANSFER',
                action: 'VIEW',
                onClick: () => {
                  router.push(
                    `/${getUrl(router.pathname, 3)}/view?id=${props?.row?.original?.node?.ID}`
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
    [t, userList?.settings?.myraUser?.list?.edges]
  );

  const selectedTransfer = rowData?.find(
    (transfer) => transfer?.node?.ID === router.query['id']
  )?.node;

  return (
    <>
      <PageHeader
        heading={`Teller Transfer - ${featureCode.tellerTransferList}`}
        // tabItems={tabList}
        button
        buttonTitle="Teller Transfer"
        onClick={() => router.push(ROUTES.CBS_TRANSFER_TELLER_ADD)}
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
        rowOnClick={(row) => {
          router.push(
            {
              query: {
                ...router.query,
                id: row?.node?.ID,
              },
            },
            undefined,
            { shallow: true }
          );
          modalProps.onToggle();
        }}
        menu="TRANSFERS"
      />

      <TellerTransferApproveModal
        transfer={selectedTransfer as TellerActivityEntry}
        approveModal={modalProps}
      />
    </>
  );
};

export default TellerTransferList;
