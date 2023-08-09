import { useMemo } from 'react';
import { useRouter } from 'next/router';
import { useQueryClient } from '@tanstack/react-query';

import { asyncToast, Chips, PageHeader } from '@myra-ui';
import { Column, Table, TablePopover } from '@myra-ui/table';

import {
  TransferRequestAction,
  useGetOperationsMinorListQuery,
  useSetBpmOperationsMinorActionMutation,
} from '@coop/cbs/data-access';
import { localizedDate, ROUTES } from '@coop/cbs/utils';
import { getPaginationQuery } from '@coop/shared/utils';

export const BPMOperationsMinorsList = () => {
  const { data: meetingData, isLoading } = useGetOperationsMinorListQuery({
    pagination: getPaginationQuery(),
  });
  const rowData = meetingData?.bpm?.operations?.minor?.listMinors?.edges ?? [];
  const router = useRouter();
  const queryClient = useQueryClient();

  const { mutateAsync: closeMutation } = useSetBpmOperationsMinorActionMutation();

  const handleApproveMinor = async (id: string) => {
    await asyncToast({
      id: 'loan-settings',
      msgs: {
        success: 'Minor Approved',
        loading: 'Approving Minor',
      },
      onSuccess: () => {
        queryClient.invalidateQueries(['getOperationsMinorList']);
        router.push(`${ROUTES.BPM_OPERATIONS_MINOR_ADDITION_LIST}`);
      },

      promise: closeMutation({
        actionType: TransferRequestAction?.Approve,
        requestid: id,
      }),
    });
  };
  const handleRejectMinor = async (id: string) => {
    await asyncToast({
      id: 'loan-settings',

      msgs: {
        success: 'Minor Rejected',
        loading: 'Rejecting Minor',
      },
      onSuccess: () => {
        queryClient.invalidateQueries(['getOperationsMinorList']);
        router.push(`${ROUTES.BPM_OPERATIONS_MINOR_ADDITION_LIST}`);
      },

      promise: closeMutation({
        actionType: TransferRequestAction?.Decline,
        requestid: id,
      }),
    });
  };
  const columns = useMemo<Column<typeof rowData[0]>[]>(
    () => [
      {
        header: 'Added Date',
        accessorKey: 'node.requestedDate',
        accessorFn: (props) => localizedDate(props?.node?.requestedDate),
      },
      {
        header: 'Member Code',
        accessorKey: 'node.code',
      },
      {
        header: 'Name ',
        accessorKey: 'node.name',
      },
      {
        header: 'Phone Number',
        accessorKey: 'node.contact',
      },
      {
        header: 'Minor Name',
        accessorKey: 'node.minorName',
      },
      {
        header: 'Relation',
        accessorKey: 'node.relation',
      },
      {
        header: 'Date of Birth',
        accessorKey: 'node.dob',
        accessorFn: (props) => localizedDate(props?.node?.dob),
      },
      {
        header: 'Status',
        accessorKey: 'node.status',
        cell: (props) => {
          switch (props?.row?.original?.node?.status) {
            case 'APPROVED':
              return (
                <Chips variant="solid" theme="success" size="md" type="label" label="Approved" />
              );

            case 'DECLINED':
              return (
                <Chips variant="solid" theme="danger" size="md" type="label" label="Declined" />
              );

            case 'PENDING':
              return <Chips variant="solid" theme="info" size="md" type="label" label="Pending" />;

            default:
              return '';
          }
        },
      },
      {
        id: '_actions',
        header: '',

        cell: (props) => {
          const test = props?.row?.original?.node?.status === 'PENDING';
          return (
            test && (
              <TablePopover
                node={props?.row?.original}
                items={[
                  {
                    title: 'Approve Minor',
                    aclKey: 'CBS_MEMBERS_MEMBER',
                    action: 'VIEW',
                    onClick: (row) => handleApproveMinor(row?.node?.id as string),
                  },
                  {
                    title: 'Reject Minor Addition',

                    aclKey: 'CBS_MEMBERS_MEMBER',
                    action: 'VIEW',
                    onClick: (row) => handleRejectMinor(row?.node?.id as string),
                  },
                ]}
              />
            )
          );
        },
        meta: {
          width: '20px',
        },
      },
    ],
    []
  );

  return (
    <>
      <PageHeader heading="Minor Addition List" />
      <Table
        isLoading={isLoading}
        data={rowData}
        columns={columns}
        pagination={{
          total: meetingData?.bpm?.operations?.minor?.listMinors?.totalCount ?? 'Many',
          pageInfo: meetingData?.bpm?.operations?.minor?.listMinors?.pageInfo,
        }}
      />
    </>
  );
};
