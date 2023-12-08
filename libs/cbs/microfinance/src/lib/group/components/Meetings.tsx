import { useMemo } from 'react';

import { Box, Column, Table, Text } from '@myra-ui';

import { MpGroupMeetings } from '@coop/cbs/data-access';
import { DetailsKeyValueCards, DetailsPageHeaderBox } from '@coop/shared/components';

export const Meetings = (props: { data: MpGroupMeetings }) => {
  const { data } = props;
  const upcomingMeetingsList = data?.upcomingMeeting || [];
  const pastMeetingsList = data?.pastMeetings || [];

  const upcomingMeetingsColumns = useMemo<Column<typeof upcomingMeetingsList[0]>[]>(
    () => [
      {
        header: 'SN',
        accessorFn: (_, index) => index + 1,
        meta: {
          width: '5%',
        },
      },
      {
        header: 'Date',
        accessorFn: (row) => row?.date?.local,
      },
      {
        header: 'Agenda',
        accessorFn: (row) => row?.agenda,
      },
      {
        header: 'Total Members',
        accessorFn: (row) => row?.totalMember,
      },
      {
        header: 'Start Time',
        accessorFn: (row) => row?.startTime,
      },
      {
        header: 'End Time',
        accessorFn: (row) => row?.endTime,
      },
    ],
    []
  );

  const pastMeetingsColumns = useMemo<Column<typeof pastMeetingsList[0]>[]>(
    () => [
      {
        header: 'SN',
        accessorFn: (_, index) => index + 1,
        meta: {
          width: '5%',
        },
      },
      {
        header: 'Date',
        accessorFn: (row) => row?.date?.local,
      },
      {
        header: 'Agenda',
        accessorFn: (row) => row?.agenda,
      },
      {
        header: 'Total Members',
        accessorFn: (row) => row?.totalMember,
      },
      {
        header: 'Start Time',
        accessorFn: (row) => row?.startTime,
      },
      {
        header: 'End Time',
        accessorFn: (row) => row?.endTime,
      },
    ],
    []
  );
  return (
    <>
      <DetailsPageHeaderBox title="Meetings" />
      <DetailsKeyValueCards
        keyValueList={[
          { label: 'Upcoming Meetings', value: data?.upcomingMeetingCount },
          { label: 'Past Meetings', value: data?.pastMeetingCount },
          { label: 'Total Meetings', value: data?.totalMeetings },
        ]}
      />
      <Box m="s24" p="s12" bg="white" borderRadius={5}>
        <Text fontSize="r1" fontWeight="semibold">
          Upcomming Meetings
        </Text>
        <Table
          data={upcomingMeetingsList}
          columns={upcomingMeetingsColumns}
          variant="report"
          size="report"
          isStatic
        />
      </Box>
      <Box m="s24" p="s12" bg="white" borderRadius={5}>
        <Text fontSize="r1" fontWeight="semibold">
          Past Meetings
        </Text>
        <Table
          data={pastMeetingsList}
          columns={pastMeetingsColumns}
          variant="report"
          size="report"
          isStatic
        />
      </Box>
    </>
  );
};

export default Meetings;
