import { useMemo } from 'react';
import { useRouter } from 'next/router';
import { useDisclosure } from '@chakra-ui/react';

import { Avatar, Box, PageHeader, Text } from '@myra-ui';
import { ApprovalStatusCell, Column, Table, TablePopover } from '@myra-ui/table';

import {
  TellerActivityEntry,
  TellerActivityState,
  TellerTransferType,
  useGetTellerTransactionListDataQuery,
} from '@coop/cbs/data-access';
import { ROUTES } from '@coop/cbs/utils';
import { featureCode, getRouterQuery, getUrl, useTranslation } from '@coop/shared/utils';

import { TellerTransferApproveModal } from '../components';

/* eslint-disable-next-line */
export interface TellerTransferListProps {}

const tellerActivityVariant: Record<TellerActivityState, 'success' | 'failure' | 'pending'> = {
  [TellerActivityState.Approved]: 'success',
  [TellerActivityState.Pending]: 'pending',
  [TellerActivityState.Cancelled]: 'failure',
};

export const TellerTransferList = () => {
  const { t } = useTranslation();

  const router = useRouter();

  const modalProps = useDisclosure();

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
        header: 'Teller Transfer Code',
        accessorFn: (row) => row?.node?.transferCode,
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
          width: '25%',
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
          width: '25%',
        },
      },
      {
        header: 'Approval Status',
        accessorFn: (row) => row?.node?.transferState,
        cell: (props) => (
          <ApprovalStatusCell
            status={props.row.original?.node?.transferState as string}
            variant={
              tellerActivityVariant[props.row.original?.node?.transferState as TellerActivityState]
            }
          />
        ),
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
      {
        id: '_actions',
        header: '',
        cell: (props) => (
          <TablePopover
            node={props?.row?.original?.node}
            items={[
              {
                title: 'viewDetails',
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
          width: '50px',
        },
      },
    ],
    [t]
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
      />

      <TellerTransferApproveModal
        transfer={selectedTransfer as TellerActivityEntry}
        approveModal={modalProps}
      />
    </>
  );
};

export default TellerTransferList;
