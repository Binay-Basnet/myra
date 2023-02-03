import React from 'react';
import { useRouter } from 'next/router';
import { useDisclosure } from '@chakra-ui/react';

import { Box, DetailCardContent, Grid, PageHeader, TablePopover, Text } from '@myra-ui';
import { Column, Table } from '@myra-ui/table';

import { RequestStatus, RequestType, useGetWithdrawViaCollectorQuery } from '@coop/cbs/data-access';
import { amountConverter, featureCode, getRouterQuery } from '@coop/shared/utils';

import { ApprovalStatusItem } from '../components/ApprovalStatusItem';
import { ApproveDeclineModal } from '../components/ApproveDeclineModal';

export const WithdrawViaCollectorList = () => {
  const router = useRouter();
  const modalProps = useDisclosure();

  const { data, isFetching } = useGetWithdrawViaCollectorQuery({
    pagination: getRouterQuery({ type: ['PAGINATION'] }),
  });

  const withdrawalRequests = React.useMemo(
    () => data?.requests?.list?.withdrawViaCollector?.edges ?? [],
    [data]
  );

  const columns = React.useMemo<Column<typeof withdrawalRequests[0]>[]>(
    () => [
      {
        header: 'Requested Date',
        accessorFn: (row) => row?.node?.requestedDate,
        cell: (props) => props?.row?.original?.node?.requestedDate,
      },
      {
        header: 'Request ID',
        accessorFn: (row) => row?.node?.id,
      },

      {
        header: 'Member',
        accessorFn: (row) => row?.node?.memberName,
        cell: (props) => (
          <Box display="flex" flexDir="column" gap="s4">
            <Text fontSize="r1" fontWeight={500} color="gray.800">
              {props.row?.original?.node?.memberName?.local}
            </Text>
            <Text fontSize="r1" color="gray.600">
              {props.row?.original?.node?.memberCode}
            </Text>
          </Box>
        ),
        meta: {
          width: '100%',
        },
      },
      {
        header: 'Account',
        accessorFn: (row) => row?.node?.accountNumber,
        cell: (props) => (
          <Box display="flex" flexDir="column" gap="s4">
            <Text fontSize="r1" fontWeight={500} color="gray.800">
              {props.row?.original?.node?.accountType}
            </Text>
            <Text fontSize="r1" color="gray.600">
              {props.row?.original?.node?.accountNumber.slice(0)}
            </Text>
          </Box>
        ),
        meta: {
          width: '100%',
        },
      },
      {
        header: 'Collector',
        accessorFn: (row) => row?.node?.collectorName,
      },
      {
        header: 'Amount',
        accessorFn: (row) => row?.node?.amount,
        cell: (props) => amountConverter(props.getValue() as string),
      },
      {
        header: 'Approval Status',
        accessorFn: (row) => row?.node?.approvalStatus,
        cell: (props) => <ApprovalStatusItem status={props.row.original?.node?.approvalStatus} />,
      },

      {
        id: '_actions',
        header: '',
        cell: (props) =>
          props.row.original?.node ? (
            <TablePopover items={[{ title: 'View Details' }]} node={props.row.original?.node} />
          ) : null,
        meta: {
          width: '60px',
        },
      },
    ],
    []
  );
  const selectedRequest = withdrawalRequests?.find(
    (request) => request?.node?.id === router.query['id']
  )?.node;

  return (
    <Box display="flex" flexDir="column">
      <Box position="sticky" top="0" zIndex={3}>
        <PageHeader
          heading={`Withdraw via Collector Request - ${featureCode.withdrawRequestList}`}
        />
      </Box>

      <Table
        data={withdrawalRequests}
        columns={columns}
        isLoading={isFetching}
        rowOnClick={(row) => {
          router.push(
            {
              query: {
                id: row?.node?.id,
                status: row?.node?.approvalStatus === RequestStatus.Pending,
              },
            },
            undefined,
            { shallow: true }
          );
          modalProps.onToggle();
        }}
        pagination={{
          total: data?.requests?.list?.withdrawViaCollector?.totalCount ?? 'Many',
          pageInfo: data?.requests?.list?.withdrawViaCollector?.pageInfo,
        }}
        menu="REQUESTS"
      />
      <ApproveDeclineModal
        approveModal={modalProps}
        requestType={RequestType.WithdrawRequest}
        queryKey="getWithdrawViaCollector"
      >
        <Box p="s16">
          <Text fontWeight="600" fontSize="r1" textTransform="capitalize" color="gray.600">
            Transfer Detail
          </Text>
        </Box>
        <Grid templateColumns="repeat(3, 1fr)" gap="s20" p="s16">
          <DetailCardContent
            title="Requested By"
            subtitle={String(selectedRequest?.memberName.local)}
          />
          <DetailCardContent title="Account" subtitle={String(selectedRequest?.accountType)}>
            <Text fontWeight="600" fontSize="r1" textTransform="capitalize" color="gray.800">
              {selectedRequest?.accountNumber}
            </Text>
          </DetailCardContent>
          <DetailCardContent
            title="Amount"
            subtitle={amountConverter(String(selectedRequest?.amount)) as string}
          />

          <DetailCardContent title="Collector">
            <Text fontWeight="600" fontSize="r1" textTransform="capitalize" color="primary.500">
              {selectedRequest?.memberName?.local}
            </Text>
          </DetailCardContent>
        </Grid>
        <Box p="s16">
          <DetailCardContent title="Remarks" subtitle={selectedRequest?.remarks} />
        </Box>
      </ApproveDeclineModal>
    </Box>
  );
};
