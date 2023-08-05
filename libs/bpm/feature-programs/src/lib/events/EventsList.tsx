import { useMemo } from 'react';
import dayjs from 'dayjs';

import { PageHeader } from '@myra-ui';
import { Column, Table } from '@myra-ui/table';

import { localizedDate } from '@coop/cbs/utils';
import { getPaginationQuery } from '@coop/shared/utils';

export const BPMProgramsEventsList = () => {
  const { data: meetingData, isLoading } = useGetGe({
    pagination: getPaginationQuery(),
  });
  const rowData = meetingData?.bpm?.programs?.listMeetings?.edges ?? [];

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
      // {
      //   id: '_actions',
      //   header: '',

      //   cell: (props) =>
      //     props?.row?.original && (
      //       <TablePopover
      //         node={props?.row?.original}
      //         items={[
      //           {
      //             title: 'View Details',
      //             aclKey: 'CBS_MEMBERS_MEMBER',
      //             action: 'VIEW',
      //             onClick: () => {
      //               router.push(
      //                 `${ROUTES.BPM_PROGRAMS_MEETINGS_DETAILS}?id=${props?.row?.original?.node?.id}`
      //               );
      //             },
      //           },
      //           {
      //             title: 'Edit Meeting',
      //             aclKey: 'CBS_MEMBERS_MEMBER',
      //             action: 'VIEW',
      //             onClick: () => {
      //               router.push(
      //                 `${ROUTES?.BPM_PROGRAMS_MEETINGS_EDIT}?id=${props?.row?.original?.node?.id}`
      //               );
      //             },
      //           },
      //           {
      //             title: 'Close Meeting',

      //             aclKey: 'CBS_MEMBERS_MEMBER',
      //             action: 'VIEW',
      //             onClick: (row) => handleCloseMeeting(row?.node?.id as string),
      //           },
      //         ]}
      //       />
      //     ),
      //   meta: {
      //     width: '20px',
      //   },
      // },
    ],
    []
  );

  return (
    <>
      <PageHeader heading="Events List" />
      <Table
        isLoading={isLoading}
        data={rowData}
        // rowOnClick={(row) => {
        //   router.push(`${ROUTES.BPM_PROGRAMS_MEETINGS_DETAILS}?id=${row?.node?.id}`);
        // }}
        columns={columns}
        pagination={{
          total: meetingData?.bpm?.programs?.listMeetings?.totalCount ?? 'Many',
          pageInfo: meetingData?.bpm?.programs?.listMeetings?.pageInfo,
        }}
      />
    </>
  );
};
