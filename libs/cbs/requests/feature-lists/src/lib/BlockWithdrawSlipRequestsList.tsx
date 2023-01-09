import React from 'react';
import { useRouter } from 'next/router';
import { useDisclosure } from '@chakra-ui/react';

import { Box, DetailCardContent, Grid, PageHeader, TablePopover, Text } from '@myra-ui';
import { Column, Table } from '@myra-ui/table';

import { RequestStatus, RequestType, useGetBlockChequeListQuery } from '@coop/cbs/data-access';
import { RedirectButton, ROUTES } from '@coop/cbs/utils';
import { featureCode, getRouterQuery } from '@coop/shared/utils';

import { ApprovalStatusItem } from '../components/ApprovalStatusItem';
import { ApproveDeclineModal } from '../components/ApproveDeclineModal';

export const BlockWithdrawSlipRequestsList = () => {
  const router = useRouter();
  const modalProps = useDisclosure();

  const { data, isFetching } = useGetBlockChequeListQuery({
    pagination: getRouterQuery({ type: ['PAGINATION'] }),
  });

  const blockChequeRequests = React.useMemo(
    () => data?.requests?.list?.blockCheque?.edges ?? [],
    [data]
  );

  const columns = React.useMemo<Column<typeof blockChequeRequests[0]>[]>(
    () => [
      {
        header: 'ID',
        accessorFn: (row) => row?.node?.id,
      },

      {
        header: 'Requested By',
        accessorFn: (row) => row?.node?.memberId,
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
          width: '60%',
        },
      },
      {
        header: 'Account',
        accessorFn: (row) => row?.node?.accountType,
        cell: (props) => (
          <Box display="flex" flexDir="column" gap="s4">
            <Text fontSize="r1" fontWeight={500} color="gray.800">
              {props.row?.original?.node?.accountType}
            </Text>
            <Text fontSize="r1" color="gray.600">
              {props.row?.original?.node?.accountNumber}
            </Text>
          </Box>
        ),
        meta: {
          width: '60%',
        },
      },
      {
        header: 'Approval Status',
        accessorFn: (row) => row?.node?.approvalStatus,
        cell: (props) => <ApprovalStatusItem status={props.row.original?.node?.approvalStatus} />,
      },

      {
        header: 'Cheque Number',
        accessorFn: (row) => row?.node?.chequeNumber,
      },
      {
        id: '_actions',
        header: '',
        cell: (props) =>
          props.row.original?.node ? (
            <TablePopover
              items={[
                {
                  title: 'View Details',
                  onClick: (row) => {
                    router.push(
                      {
                        query: {
                          id: row?.id,
                          status: row?.approvalStatus === RequestStatus.Pending,
                        },
                      },
                      undefined,
                      { shallow: true }
                    );
                    modalProps.onToggle();
                  },
                },
              ]}
              node={props.row.original?.node}
            />
          ) : null,
        meta: {
          width: '60px',
        },
      },
    ],
    []
  );

  const selectedRequest = blockChequeRequests?.find(
    (request) => request?.node?.id === router.query['id']
  )?.node;

  return (
    <Box display="flex" flexDir="column">
      <Box position="sticky" top="0" zIndex={3}>
        <PageHeader heading={`Block Withdraw Slip Request - ${featureCode.blockWithdrawSlip}`} />
      </Box>

      <Table
        data={blockChequeRequests}
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
          total: data?.requests?.list?.blockCheque?.totalCount ?? 'Many',
          pageInfo: data?.requests?.list?.blockCheque?.pageInfo,
        }}
      />

      <ApproveDeclineModal
        requestType={RequestType.BlockCheque}
        queryKey="getBlockChequeList"
        approveModal={modalProps}
      >
        <Grid templateColumns="repeat(3, 1fr)" gap="s20" p="s16">
          <DetailCardContent
            title="Requested By"
            subtitle={String(selectedRequest?.memberName?.local)}
          >
            <Text fontWeight="600" fontSize="r1" textTransform="capitalize" color="gray.800">
              {selectedRequest?.memberId}
            </Text>
          </DetailCardContent>
          <DetailCardContent title="Account">
            <>
              <RedirectButton
                link={`${ROUTES.CBS_ACCOUNT_SAVING_DETAILS}?id=${selectedRequest?.accountNumber}`}
                label={selectedRequest?.accountType as string}
              />
              <Text fontWeight="600" fontSize="r1" textTransform="capitalize" color="gray.800">
                {selectedRequest?.accountNumber}
              </Text>
            </>
          </DetailCardContent>
          <DetailCardContent title="Cheque Number" subtitle={selectedRequest?.chequeNumber} />
        </Grid>
        <Box p="s16">
          <DetailCardContent title="Reason" subtitle={selectedRequest?.reason} />
        </Box>
      </ApproveDeclineModal>
    </Box>
  );
};
