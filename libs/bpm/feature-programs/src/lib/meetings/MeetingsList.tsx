import { useMemo } from 'react';
import { useRouter } from 'next/router';
import { useQueryClient } from '@tanstack/react-query';
import dayjs from 'dayjs';

import { asyncToast, PageHeader } from '@myra-ui';
import { Column, Table, TablePopover } from '@myra-ui/table';

import { useGetMeetingsListQuery, useSetCloseBpmMeetingsMutation } from '@coop/cbs/data-access';
import { localizedDate, ROUTES } from '@coop/cbs/utils';
import { getPaginationQuery } from '@coop/shared/utils';

export const BPMProgramsMeetingsList = () => {
  const { data: meetingData, isLoading } = useGetMeetingsListQuery({
    pagination: getPaginationQuery(),
  });
  const router = useRouter();
  const rowData = meetingData?.bpm?.programs?.listMeetings?.edges ?? [];
  const queryClient = useQueryClient();

  const { mutateAsync: closeMutation } = useSetCloseBpmMeetingsMutation();

  const handleCloseMeeting = async (id: string) => {
    await asyncToast({
      id: 'loan-settings',
      msgs: {
        success: 'Meeting Closed',
        loading: 'Closing Meeting',
      },
      onSuccess: () => {
        queryClient.invalidateQueries(['getMeetingsList']);
        router.push(`${ROUTES.BPM_PROGRAMS_MEETINGS_LIST}`);
      },

      promise: closeMutation({
        meetingID: id,
      }),
    });
  };

  const columns = useMemo<Column<typeof rowData[0]>[]>(
    () => [
      {
        header: 'Date',
        accessorKey: 'node.date',
        accessorFn: (props) => localizedDate(props?.node?.date),
      },
      {
        header: 'Time',
        accessorKey: 'node.time',
        accessorFn: (props) => dayjs(props?.node?.time)?.format('hh:mm A'),
      },
      {
        header: 'Meeting Title',
        accessorKey: 'node.title',
      },
      {
        header: 'Meeting Type',
        accessorKey: 'node.type',
      },
      {
        header: 'Scheduled By ',
        accessorKey: 'node.scheduledBy',
      },
      {
        header: 'Total Attendees',
        accessorKey: 'node.totalAttendees',
      },
      {
        header: 'Status',
        accessorKey: 'node.status',
      },
      {
        id: '_actions',
        header: '',

        cell: (props) =>
          props?.row?.original && (
            <TablePopover
              node={props?.row?.original}
              items={[
                {
                  title: 'Edit',
                  aclKey: 'CBS_MEMBERS_MEMBER',
                  action: 'VIEW',
                  onClick: () => {
                    router.push(
                      `${ROUTES?.BPM_PROGRAMS_MEETINGS_EDIT}?id=${props?.row?.original?.node?.id}`
                    );
                  },
                },
                {
                  title: 'Close Meeting',
                  aclKey: 'CBS_MEMBERS_MEMBER',
                  action: 'VIEW',
                  onClick: (row) => handleCloseMeeting(row?.node?.id as string),
                },
              ]}
            />
          ),
        meta: {
          width: '20px',
        },
      },
    ],
    []
  );

  return (
    <>
      <PageHeader heading="Meetings List" />
      <Table
        isLoading={isLoading}
        data={rowData}
        columns={columns}
        pagination={{
          total: meetingData?.bpm?.programs?.listMeetings?.totalCount ?? 'Many',
          pageInfo: meetingData?.bpm?.programs?.listMeetings?.pageInfo,
        }}
      />
    </>
  );
};
