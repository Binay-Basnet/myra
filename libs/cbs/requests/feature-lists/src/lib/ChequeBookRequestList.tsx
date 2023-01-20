import React from 'react';
import { useRouter } from 'next/router';
import { useDisclosure } from '@chakra-ui/react';

import {
  Box,
  DetailCardContent,
  DetailPageMemberCard,
  Grid,
  PageHeader,
  TablePopover,
  Text,
} from '@myra-ui';
import { Column, Table } from '@myra-ui/table';

import {
  ChequePickUpMethod,
  RequestStatus,
  RequestType,
  useGetChequeBookRequestsQuery,
} from '@coop/cbs/data-access';
import { RedirectButton, ROUTES } from '@coop/cbs/utils';
import { featureCode, getRouterQuery } from '@coop/shared/utils';

import { ApprovalStatusItem } from '../components/ApprovalStatusItem';
import { ApproveDeclineModal } from '../components/ApproveDeclineModal';

const CHEQUE_PICK_METHOD = {
  [ChequePickUpMethod.SelfPickup]: 'Self Pickup',
  [ChequePickUpMethod.ThroughAgent]: 'Through Agent',
};

export const ChequeBookRequestList = () => {
  const router = useRouter();
  const modalProps = useDisclosure();

  const { data, isFetching } = useGetChequeBookRequestsQuery({
    pagination: getRouterQuery({ type: ['PAGINATION'] }),
  });

  const chequeBookRequests = React.useMemo(
    () => data?.requests?.list?.chequeBookRequest?.edges ?? [],
    [data]
  );

  const columns = React.useMemo<Column<typeof chequeBookRequests[0]>[]>(
    () => [
      {
        header: 'Requested Date',
        accessorFn: (row) => row?.node?.requestedDate,
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
          width: '60%',
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
              {props.row?.original?.node?.accountNumber}
            </Text>
          </Box>
        ),
        meta: {
          width: '70%',
        },
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
            <TablePopover
              items={[
                {
                  title: 'View Details',
                  // aclKey: 'CBS_WITHDRAW_SLIPS_WITHDRAW_SLIPS_REQUESTS',
                  // action: 'VIEW',
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

  const selectedRequest = chequeBookRequests?.find(
    (request) => request?.node?.id === router.query['id']
  )?.node;

  return (
    <Box display="flex" flexDir="column">
      <Box position="sticky" top="0" zIndex={3}>
        <PageHeader heading={`Withdraw Slip Requests - ${featureCode?.withdrawSlipRequestList}`} />
      </Box>

      <Table
        isLoading={isFetching}
        data={chequeBookRequests}
        columns={columns}
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
          total: data?.requests?.list?.chequeBookRequest?.totalCount ?? 'Many',
          pageInfo: data?.requests?.list?.chequeBookRequest?.pageInfo,
        }}
        menu="WITHDRAW_SLIP"
      />

      <ApproveDeclineModal
        approveModal={modalProps}
        requestType={RequestType.ChequeBookRequest}
        queryKey="getChequeBookRequests"
      >
        Value
        <Box borderBottom="1px" borderBottomColor="border.layout">
          <DetailPageMemberCard
            id={selectedRequest?.memberId as string}
            name={selectedRequest?.memberName?.local as string}
            profilePicUrl={selectedRequest?.memberProfilePicUrl as string}
            memberGender={selectedRequest?.memberGender}
            memberAge={selectedRequest?.memberAge}
          />
        </Box>
        <Grid templateColumns="repeat(3, 1fr)" gap="s20" p="s16">
          <DetailCardContent
            title="Account Name"
            children={
              <RedirectButton
                link={`${ROUTES.CBS_ACCOUNT_SAVING_DETAILS}?id=${selectedRequest?.accountNumber}`}
                label={selectedRequest?.accountType as string}
              />
            }
          />
          <DetailCardContent title="Account Number" subtitle={selectedRequest?.accountNumber} />
          <DetailCardContent title="Branch" subtitle={selectedRequest?.branchName} />
          <DetailCardContent
            title="Number Of Leaves"
            subtitle={String(selectedRequest?.numberOfLeaves ?? 0)}
          />
          <DetailCardContent
            title="Pickup Method"
            subtitle={
              selectedRequest?.pickUpMethod
                ? CHEQUE_PICK_METHOD[selectedRequest?.pickUpMethod]
                : null
            }
          >
            {selectedRequest?.pickUpMethod === ChequePickUpMethod.ThroughAgent && (
              <Text fontWeight="600" fontSize="r1" textTransform="capitalize" color="primary.500">
                {selectedRequest?.agentName}
              </Text>
            )}
          </DetailCardContent>
        </Grid>
        <Box p="s16">
          <DetailCardContent title="Remarks" subtitle={selectedRequest?.remarks} />
        </Box>
      </ApproveDeclineModal>
    </Box>
  );
};
