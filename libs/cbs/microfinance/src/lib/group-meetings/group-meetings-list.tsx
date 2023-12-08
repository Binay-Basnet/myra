import { useMemo } from 'react';
import { useRouter } from 'next/router';
import { ApprovalStatusItem } from 'libs/cbs/requests/feature-lists/src/components/ApprovalStatusItem';

import { Column, PageHeader, Table } from '@myra-ui';

import { LeaveStatusEnum, useListMfMeetingsQuery } from '@coop/cbs/data-access';
import { ROUTES } from '@coop/cbs/utils';
import { getPaginationQuery } from '@coop/shared/utils';

export const GroupMeetingsList = () => {
  const router = useRouter();
  const { data, isFetching } = useListMfMeetingsQuery({
    pagination: getPaginationQuery(),
  });

  const rowData = useMemo(
    () => data?.microFinance?.groupMeeting?.listMFMeetings?.edges ?? [],
    [data]
  );

  const columns = useMemo<Column<typeof rowData[0]>[]>(
    () => [
      {
        header: 'Group Name',
        accessorFn: (row) => row?.node?.groupName,
      },
      {
        header: 'Agenda',
        accessorFn: (row) => row?.node?.agenda,
      },
      {
        header: 'Date',
        accessorFn: (row) => row?.node?.date?.local,
      },
      {
        header: 'Start Time',
        accessorFn: (row) => row?.node?.startTime,
      },
      {
        header: 'End Time',
        accessorFn: (row) => row?.node?.endTime,
      },
      {
        header: 'No of Attendees',
        accessorFn: (row) => row?.node?.presentMembers,
      },

      {
        id: 'state',
        header: 'Status',
        accessorFn: (row) => row?.node?.status,
        cell: (props) => (
          <ApprovalStatusItem status={props?.row?.original?.node?.status as LeaveStatusEnum} />
        ),
      },

      {
        id: '_actions',
        header: '',
        cell: () => {},
      },
    ],
    []
  );
  return (
    <>
      <PageHeader heading="Microfinance Groups Meetings List" />{' '}
      <Table
        isLoading={isFetching}
        data={rowData}
        columns={columns}
        pagination={{
          total: data?.microFinance?.groupMeeting?.listMFMeetings?.totalCount as number,
          pageInfo: data?.microFinance?.groupMeeting?.listMFMeetings?.pageInfo,
        }}
        rowOnClick={(row) =>
          router.push(`${ROUTES?.CBS_MICRO_FINANCE_GROUP_METTINGS_DETAILS}?id=${row?.node?.id}`)
        }
      />
    </>
  );
};

export default GroupMeetingsList;
