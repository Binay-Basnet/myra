import React from 'react';
import { useRouter } from 'next/router';
import { useDisclosure } from '@chakra-ui/react';

import { Box, DetailCardContent, DetailsCard, Grid, PageHeader, TablePopover } from '@myra-ui';
import { Column, Table } from '@myra-ui/table';

import { RequestStatus, useAppSelector, useGetMemberRequestListQuery } from '@coop/cbs/data-access';
import { localizedDate, localizedText } from '@coop/cbs/utils';
import { featureCode, getPaginationQuery } from '@coop/shared/utils';

import { ApprovalStatusItem } from '../components/ApprovalStatusItem';
import { MemberApproveOrDeclineModal } from '../components/MemberApproveOrDeclineModal';

export const MemberRequestPage = () => {
  const router = useRouter();
  const modalProps = useDisclosure();
  const preference = useAppSelector((state) => state?.auth?.preference?.date);

  const { data, isFetching } = useGetMemberRequestListQuery({
    pagination: getPaginationQuery(),
  });
  const memberRequests = data?.requests?.list?.membershipRequest?.edges || [];

  const columns = React.useMemo<Column<typeof memberRequests[0]>[]>(
    () => [
      {
        header: 'Requested Date',
        accessorFn: (row) => localizedDate(row?.node?.requestedDate),
        cell: (props) => localizedDate(props?.row?.original?.node?.requestedDate),
      },
      {
        header: 'Request ID',
        accessorFn: (row) => row?.node?.id,
      },
      {
        header: 'Member',
        accessorFn: (row) => `${row?.node?.firstName} ${row?.node?.lastName}`,
        meta: {
          width: '60%',
        },
      },

      {
        header: 'Contact Number',
        accessorFn: (row) => row?.node?.phoneNumber,
      },
      {
        header: 'Approval Status',
        accessorFn: (row) => row?.node?.status,
        cell: (props) => (
          <ApprovalStatusItem status={props.row.original?.node?.status as RequestStatus} />
        ),
      },

      {
        id: '_actions',
        header: '',
        cell: (props) => (
          <TablePopover
            items={[
              {
                title: 'View Details',
                aclKey: 'CBS_REQUESTS_MEMBER_REQUESTS',
                action: 'VIEW',
                onClick: () => {
                  router.push(
                    {
                      query: {
                        id: props?.row?.original?.node?.id,
                        status: props?.row?.original?.node?.status === RequestStatus.Pending,
                      },
                    },
                    undefined,
                    { shallow: true }
                  );
                  modalProps.onToggle();
                },
              },
            ]}
            node={props.row.original}
          />
        ),
        meta: {
          width: '60px',
        },
      },
    ],
    [router.locale, preference]
  );

  const selectedMemberRequest = memberRequests?.find(
    (request) => request?.node?.id === router.query['id']
  )?.node;

  return (
    <Box display="flex" flexDir="column">
      <Box position="sticky" top="0" zIndex={3}>
        <PageHeader heading={`Member Request - ${featureCode.memberRequestList}`} />
      </Box>

      <Table
        isLoading={isFetching}
        data={memberRequests}
        columns={columns}
        rowOnClick={(row) => {
          router.push(
            {
              query: {
                id: row?.node?.id,
                status: row?.node?.status === RequestStatus.Pending,
              },
            },
            undefined,
            { shallow: true }
          );
          modalProps.onToggle();
        }}
        pagination={{
          total: data?.requests?.list?.membershipRequest?.totalCount ?? 'Many',
          pageInfo: data?.requests?.list?.membershipRequest?.pageInfo,
        }}
        menu="REQUESTS"
      />

      <MemberApproveOrDeclineModal approveModal={modalProps}>
        <DetailsCard hasTable title="Basic Information">
          <Grid templateColumns="repeat(2, 1fr)" gap="s20">
            <DetailCardContent title="First Name" subtitle={selectedMemberRequest?.firstName} />
            <DetailCardContent title="Middle Name" subtitle={selectedMemberRequest?.middleName} />
            <DetailCardContent title="Last Name" subtitle={selectedMemberRequest?.lastName} />
            <DetailCardContent title="Gender" subtitle={selectedMemberRequest?.gender} />
            <DetailCardContent
              title="Date of Birth"
              subtitle={selectedMemberRequest?.dateOfBirth}
            />
          </Grid>
        </DetailsCard>

        <DetailsCard hasTable title="Contact Details">
          <Grid templateColumns="repeat(2, 1fr)" gap="s20">
            <DetailCardContent
              title="Mobile Number"
              subtitle={selectedMemberRequest?.mobileNumber}
            />
            <DetailCardContent title="Phone Number" subtitle={selectedMemberRequest?.phoneNumber} />
            <DetailCardContent title="Email" subtitle={selectedMemberRequest?.email} />
          </Grid>
        </DetailsCard>

        <DetailsCard hasTable title="Address">
          <Grid templateColumns="repeat(2, 1fr)" gap="s20">
            <DetailCardContent
              title="Province"
              subtitle={localizedText(selectedMemberRequest?.permanentAddress?.state)}
            />
            <DetailCardContent
              title="District"
              subtitle={localizedText(selectedMemberRequest?.permanentAddress?.district)}
            />
            <DetailCardContent
              title="Local Government"
              subtitle={
                localizedText(selectedMemberRequest?.permanentAddress?.localGovernment) || '-'
              }
            />
            <DetailCardContent
              title="Ward Number"
              subtitle={selectedMemberRequest?.permanentAddress?.wardNo}
            />
            <DetailCardContent
              title="Locality"
              subtitle={localizedText(selectedMemberRequest?.permanentAddress?.locality)}
            />
            <DetailCardContent
              title="House Number"
              subtitle={selectedMemberRequest?.permanentAddress?.houseNo}
            />
          </Grid>
        </DetailsCard>
      </MemberApproveOrDeclineModal>
    </Box>
  );
};
