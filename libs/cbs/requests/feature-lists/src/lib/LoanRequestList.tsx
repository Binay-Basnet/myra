import React from 'react';
import { useRouter } from 'next/router';
import { useDisclosure } from '@chakra-ui/react';

import { Box, DetailCardContent, Grid, PageHeader, TablePopover, Text } from '@myra-ui';
import { Column, Table } from '@myra-ui/table';

import { RequestStatus, useGetLoanRequestsQuery } from '@coop/cbs/data-access';
import { amountConverter, featureCode, getPaginationQuery } from '@coop/shared/utils';

import { ApprovalStatusItem } from '../components/ApprovalStatusItem';
import { LoanApproveOrDeclineModal } from '../components/LoanApproveOrDeclineModal';

export const LoanRequestList = () => {
  const router = useRouter();
  const { data, isFetching } = useGetLoanRequestsQuery({
    pagination: getPaginationQuery(),
  });
  const modalProps = useDisclosure();

  const loanRequests = React.useMemo(() => data?.requests?.list?.loanRequest?.edges ?? [], [data]);

  const columns = React.useMemo<Column<typeof loanRequests[0]>[]>(
    () => [
      {
        header: 'Last Modified Date',
        accessorFn: (row) => row?.node?.lastModifiedDate,
        cell: (props) => props?.row?.original?.node?.lastModifiedDate,
      },
      {
        header: 'Request ID',
        accessorFn: (row) => row?.node?.id,
      },

      {
        header: 'Member',
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
        header: 'Applied Amount',
        accessorFn: (row) => row?.node?.loanAmount,
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
            <TablePopover
              items={[
                {
                  title: 'View Details',
                  aclKey: 'CBS_REQUESTS_LOAN_REQUESTS',
                  action: 'VIEW',
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

  const selectedRequest = loanRequests?.find(
    (request) => request?.node?.id === router.query['id']
  )?.node;

  return (
    <Box display="flex" flexDir="column">
      <Box position="sticky" top="0" zIndex={3}>
        <PageHeader heading={`Loan Request - ${featureCode.loanRequestList}`} />
      </Box>

      <Table
        data={loanRequests}
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
          total: data?.requests?.list?.loanRequest?.totalCount ?? 'Many',
          pageInfo: data?.requests?.list?.loanRequest?.pageInfo,
        }}
        menu="REQUESTS"
      />

      <LoanApproveOrDeclineModal queryKey="getLoanRequests" approveModal={modalProps}>
        <Grid templateColumns="repeat(3, 1fr)" gap="s20" p="s16">
          <DetailCardContent
            title="Requested By"
            subtitle={String(selectedRequest?.memberName.local)}
          />
          <DetailCardContent
            title="Loan Amount"
            subtitle={amountConverter(String(selectedRequest?.loanAmount)) as string}
          />
          <DetailCardContent title="Purpose" subtitle={String(selectedRequest?.purpose)} />
        </Grid>
      </LoanApproveOrDeclineModal>
    </Box>
  );
};
