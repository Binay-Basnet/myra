import { useMemo } from 'react';
import { useRouter } from 'next/router';
import { ApprovalStatusItem } from 'libs/cbs/requests/feature-lists/src/components/ApprovalStatusItem';

import { Column, PageHeader, Table, TablePopover } from '@myra-ui';

import { LeaveStatusEnum, useGetTaskListQuery } from '@coop/cbs/data-access';
import { ROUTES } from '@coop/cbs/utils';
import { getPaginationQuery } from '@coop/shared/utils';

export const TaskList = () => {
  const router = useRouter();

  const { data, isFetching } = useGetTaskListQuery({
    pagination: getPaginationQuery(),
  });

  const rowData = useMemo(() => data?.bpm?.task?.listTask?.edges ?? [], [data]);

  const columns = useMemo<Column<typeof rowData[0]>[]>(
    () => [
      {
        header: 'Assigned Date',
        accessorFn: (row) => row?.node?.assignedDate?.local,
      },
      {
        header: 'Task Title',
        accessorFn: (row) => row?.node?.taskTitle,
      },
      {
        header: 'Assigned By',
        accessorFn: (row) => row?.node?.assignedBy,
      },
      {
        header: 'Assigned To',
        accessorFn: (row) => row?.node?.assignedTo,
      },
      {
        header: 'Task Authority',
        accessorFn: (row) => row?.node?.taskAuthority,
      },
      {
        header: 'Status',
        accessorFn: (row) => row?.node?.status,

        cell: (props) => (
          <ApprovalStatusItem status={props?.row?.original?.node?.status as LeaveStatusEnum} />
        ),
      },
      {
        id: '_actions',
        header: '',
        cell: (props) =>
          props?.row?.original?.node && (
            <TablePopover
              node={props?.row?.original?.node}
              items={[
                {
                  title: 'Edit',
                  onClick: (row) => {
                    router.push(`${ROUTES?.BPM_TASKS_ADD}?id=${row?.id}`);
                  },
                },
              ]}
            />
          ),
        meta: {
          width: '3.125rem',
        },
      },
    ],
    []
  );

  return (
    <>
      <PageHeader heading="Tasks" />{' '}
      <Table
        isLoading={isFetching}
        data={rowData}
        columns={columns}
        pagination={{
          total: data?.bpm?.task?.listTask?.totalCount as number,
          pageInfo: data?.bpm?.task?.listTask?.pageInfo,
        }}
      />
    </>
  );
};

export default TaskList;
