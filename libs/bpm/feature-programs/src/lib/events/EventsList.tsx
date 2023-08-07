import { useMemo } from 'react';
import { useRouter } from 'next/router';

import { PageHeader } from '@myra-ui';
import { Column, Table, TablePopover } from '@myra-ui/table';

import { useGetEventsListQuery } from '@coop/cbs/data-access';
import { ROUTES } from '@coop/cbs/utils';
import { getPaginationQuery } from '@coop/shared/utils';

export const BPMProgramsEventsList = () => {
  const { data: meetingData, isLoading } = useGetEventsListQuery({
    pagination: getPaginationQuery(),
  });
  const rowData = meetingData?.bpm?.programs?.listEvents?.edges ?? [];
  const router = useRouter();

  const columns = useMemo<Column<typeof rowData[0]>[]>(
    () => [
      {
        header: 'Event Name',
        accessorKey: 'node.eventName',
      },
      {
        header: 'Event Type',
        accessorKey: 'node.eventType',
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
                // {
                //   title: 'View Details',
                //   aclKey: 'CBS_MEMBERS_MEMBER',
                //   action: 'VIEW',
                //   onClick: () => {
                //     router.push(
                //       `${ROUTES.BPM_PROGRAMS_MEETINGS_DETAILS}?id=${props?.row?.original?.node?.id}`
                //     );
                //   },
                // },
                {
                  title: 'Edit Event',
                  aclKey: 'CBS_MEMBERS_MEMBER',
                  action: 'VIEW',
                  onClick: () => {
                    router.push(
                      `${ROUTES?.BPM_PROGRAMS_EVENTS_EDIT}?id=${props?.row?.original?.node?.id}`
                    );
                  },
                },
                // {
                //   title: 'Close Meeting',

                //   aclKey: 'CBS_MEMBERS_MEMBER',
                //   action: 'VIEW',
                //   onClick: (row) => handleCloseMeeting(row?.node?.id as string),
                // },
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
      <PageHeader heading="Events List" />
      <Table
        isLoading={isLoading}
        data={rowData}
        // rowOnClick={(row) => {
        //   router.push(`${ROUTES.BPM_PROGRAMS_MEETINGS_DETAILS}?id=${row?.node?.id}`);
        // }}
        columns={columns}
        pagination={{
          total: meetingData?.bpm?.programs?.listEvents?.totalCount ?? 'Many',
          pageInfo: meetingData?.bpm?.programs?.listEvents?.pageInfo,
        }}
      />
    </>
  );
};
