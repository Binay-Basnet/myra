import { useMemo, useState } from 'react';
import { IoIosArrowDown } from 'react-icons/io';
import { useRouter } from 'next/router';
import { Portal } from '@chakra-ui/react';
import { ApprovalStatusItem } from 'libs/cbs/requests/feature-lists/src/components/ApprovalStatusItem';

import {
  Box,
  Column,
  Icon,
  PageHeader,
  Popover,
  PopoverContent,
  PopoverTrigger,
  Table,
  TablePopover,
} from '@myra-ui';

import { LeaveStatusEnum, useGetTaskListQuery } from '@coop/cbs/data-access';
import { ROUTES } from '@coop/cbs/utils';
import { getPaginationQuery } from '@coop/shared/utils';

import AssignModal from './components/AssignModal';
import PopoverItem from './components/PopoverItem';

const popOverItemData = [
  {
    itemColor: 'red.500',
    itemText: 'Assigned',
  },
  {
    itemColor: 'yellow.500',
    itemText: 'Pending',
  },
  {
    itemColor: 'blue.500',
    itemText: 'Started',
  },
  {
    itemColor: 'red.500',
    itemText: 'Completed',
  },
];

export const TaskList = () => {
  const router = useRouter();
  const [selectedTaskId, setSelectedTaskId] = useState('');
  const [isAssignModalOpen, setIsAssignModalOpen] = useState(false);

  const { data, isFetching, refetch } = useGetTaskListQuery({
    pagination: getPaginationQuery(),
  });

  const handleClearTaskId = () => {
    setSelectedTaskId('');
  };

  const handleCloseAssignModal = () => {
    setIsAssignModalOpen(false);
  };

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
          <Box display="flex" alignItems="center" gap="s8">
            <ApprovalStatusItem status={props?.row?.original?.node?.status as LeaveStatusEnum} />

            <Popover isLazy placement="bottom-start" colorScheme="primary">
              {({ onClose }) => (
                <>
                  <PopoverTrigger>
                    <Box as="button" display="flex" alignItems="center">
                      <Icon size="sm" as={IoIosArrowDown} />
                    </Box>
                  </PopoverTrigger>
                  <Portal>
                    <PopoverContent w="100%" boxShadow="E2" border="none" borderRadius="br2">
                      {popOverItemData?.map((item) => (
                        <PopoverItem
                          itemColor={item?.itemColor}
                          itemText={item?.itemText}
                          taskId={props?.cell?.row?.original?.node?.id}
                          onClose={onClose}
                        />
                      ))}
                    </PopoverContent>
                  </Portal>
                </>
              )}
            </Popover>
          </Box>
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
                    router.push(`${ROUTES?.BPM_TASKS_EDIT}?id=${row?.id}`);
                  },
                },
                {
                  title: 'Assign Task',
                  onClick: (row) => {
                    setSelectedTaskId(row?.id);
                    setIsAssignModalOpen(true);
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
      <AssignModal
        isAssignModalOpen={isAssignModalOpen}
        selectedTaskId={selectedTaskId}
        handleClearTaskId={handleClearTaskId}
        handleCloseAssignModal={handleCloseAssignModal}
        refetch={refetch}
      />
    </>
  );
};

export default TaskList;
