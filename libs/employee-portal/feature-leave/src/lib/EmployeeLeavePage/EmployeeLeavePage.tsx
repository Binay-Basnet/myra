import React from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { useDisclosure } from '@chakra-ui/react';
import { useQueryClient } from '@tanstack/react-query';
import dayjs from 'dayjs';

import {
  ApprovalStatusCell,
  asyncToast,
  Box,
  Button,
  Divider,
  GridItem,
  Input,
  Modal,
  Select,
  Table,
  Text,
} from '@myra-ui';

import {
  DateRangeSelectorWithFilter,
  EmployeeHeader,
  EmployeeStatCard,
  getRange,
} from '@coop/employee-portal/components';
import {
  ApplyForLeaveInput,
  LeaveStatusEnum,
  useApplyForLeaveMutation,
  useAppSelector,
  useGetLeaveListQuery,
  useGetLeaveStatsQuery,
  useGetLeaveTypeListQuery,
} from '@coop/employee-portal/data-access';
import { FormDatePicker, FormSelect, FormTextArea } from '@coop/shared/form';
import { getFilterQuery } from '@coop/shared/utils';

const leaveVariant: Record<LeaveStatusEnum, 'success' | 'failure' | 'pending'> = {
  [LeaveStatusEnum.Approved]: 'success',
  [LeaveStatusEnum.Pending]: 'pending',
  [LeaveStatusEnum.Declined]: 'failure',
};

export const EmployeeLeavePage = () => {
  const { isOpen, onClose, onToggle } = useDisclosure();
  const userID = useAppSelector((state) => state.auth.user?.id);
  const { data } = useGetLeaveStatsQuery();
  const { data: leaveListData } = useGetLeaveListQuery({
    filter: getFilterQuery({
      id: { compare: '=', value: String(userID) },
      leaveFrom: {
        compare: '< >',
        value: {
          from: getRange('week', new Date()).from.format('YYYY-MM-DD'),
          to: getRange('week', new Date()).to.format('YYYY-MM-DD'),
        },
      },
    }),
    pagination: { after: '', first: -1 },
  });

  return (
    <>
      <EmployeeHeader
        title="Leave"
        subTitle="Find all your Leave Balance, Leave History and Request Status."
        leftButton={<Button onClick={onToggle}>Apply for Leave</Button>}
      />

      <ApplyForLeaveModal isOpen={isOpen} onClose={onClose} />

      <Box display="flex" flexDir="column" gap="s8" py="s24">
        <Text fontSize="r1" color="gray.600" fontWeight={500}>
          Leave Balance
        </Text>
        <Box display="flex" gap="s20">
          {data?.employee?.leave?.statistics?.data?.map((stats) => (
            <React.Fragment key={stats.leaveType}>
              <EmployeeStatCard
                title={String(stats.leaveType)}
                subTitle={`${stats.takenLeave}/${stats.totalLeave}`}
              />
            </React.Fragment>
          ))}
        </Box>
      </Box>

      <Divider my="s8" />

      <Box py="s24" display="flex" flexDir="column" gap="s12">
        <DateRangeSelectorWithFilter />
        <Box
          border="1px"
          h={
            Number(leaveListData?.employee?.leave?.list?.data?.edges?.length) < 8 ? '100%' : '560px'
          }
          borderColor="border.layout"
          borderRadius="br2"
          overflow="hidden"
        >
          <Table
            isStatic
            data={leaveListData?.employee?.leave?.list?.data?.edges || []}
            columns={[
              {
                header: 'Leave Type',
                accessorFn: (row) => row?.node?.leaveType,
              },
              {
                header: 'Leave Count',
                cell: (props) =>
                  `${dayjs(props.row.original?.node?.leaveTo?.local).diff(
                    dayjs(props.row.original?.node?.leaveFrom?.local),
                    'day'
                  )} day(s)`,
              },
              {
                header: 'Duration',
                accessorFn: (row) => row?.node?.leaveType,
                cell: (props) =>
                  `${props.row.original?.node?.leaveFrom?.local} - ${props.row.original?.node?.leaveTo?.local}`,
              },
              {
                header: 'Reason',
                accessorFn: (row) => row?.node?.leaveReason,
              },
              {
                header: 'Leave Approver',
                accessorFn: (row) => row?.node?.leaveApprover,
              },
              {
                header: 'Status',
                accessorFn: (row) => row?.node?.leaveStatus,
                cell: (props) => (
                  <ApprovalStatusCell
                    status={props?.row?.original?.node?.leaveStatus as string}
                    variant={leaveVariant[props.row.original?.node?.leaveStatus as LeaveStatusEnum]}
                  />
                ),
              },
            ]}
          />
        </Box>
      </Box>
    </>
  );
};

interface ApplyForLeaveModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const ApplyForLeaveModal = ({ isOpen, onClose }: ApplyForLeaveModalProps) => {
  const queryClient = useQueryClient();
  const user = useAppSelector((state) => state.auth.user);
  const methods = useForm<ApplyForLeaveInput>({
    defaultValues: {
      leaveFromDate: undefined,
      leaveToDate: undefined,
      leaveReason: undefined,
      leaveApproverId: undefined,
    },
  });
  const { mutateAsync: applyForLeave } = useApplyForLeaveMutation();

  const { data: leaveTypeData } = useGetLeaveTypeListQuery({
    filter: getFilterQuery({}),
    pagination: { after: '', first: -1 },
  });

  const { data: leaveStats } = useGetLeaveStatsQuery();

  const fromDate = methods.watch('leaveFromDate');
  const toDate = methods.watch('leaveToDate');

  const diff = fromDate?.en && toDate?.en ? dayjs(toDate?.en).diff(dayjs(fromDate?.en), 'days') : 0;

  return (
    <Modal
      width="3xl"
      open={isOpen}
      hidePadding
      onClose={() => {
        methods.setValue('leaveTypeId', '');
        methods.setValue('leaveFromDate', { en: '', local: '', np: '' });
        methods.setValue('leaveToDate', { en: '', local: '', np: '' });
        methods.setValue('leaveReason', '');
        onClose();
      }}
      primaryButtonLabel="Submit Leave Request"
      title="Apply for Leave"
      primaryButtonHandler={methods.handleSubmit(async (data) => {
        await asyncToast({
          promise: applyForLeave({
            data,
          }),
          id: 'apply-leave',
          msgs: {
            loading: 'Submitting Leave Request',
            success: 'Leave Request Submitted',
          },
          onSuccess: () => {
            methods.setValue('leaveTypeId', '');
            methods.setValue('leaveFromDate', { en: '', local: '', np: '' });
            methods.setValue('leaveToDate', { en: '', local: '', np: '' });
            methods.setValue('leaveReason', '');

            onClose();

            queryClient.invalidateQueries(['getLeaveStats']);
            queryClient.invalidateQueries(['getLeaveList']);
          },
        });
      })}
    >
      <FormProvider {...methods}>
        <Box as="form">
          <Box
            p="s20"
            display="flex"
            flexDir="column"
            borderBottom="1px"
            borderColor="border.layout"
            gap="s16"
          >
            <Text fontSize="r1" color="gray.700" fontWeight={500}>
              Allocated Leave
            </Text>
            <Table
              variant="report"
              size="report"
              isStatic
              data={leaveStats?.employee?.leave?.statistics?.data || []}
              columns={[
                {
                  header: 'Leave Type',
                  accessorFn: (row) => row.leaveType,
                },
                {
                  header: 'Total Allocated Leaves',
                  accessorFn: (row) => row.totalLeave,
                },
                {
                  header: 'Used Leaves',
                  accessorFn: (row) => row.takenLeave,
                },
                {
                  header: 'Pending leaves',
                  accessorFn: (row) => row.takenLeave,
                  cell: () => <>0</>,
                },
                {
                  header: 'Available Leaves',
                  accessorFn: (row) => row.leaveType,
                  cell: (props) => (
                    <Box>
                      {Number(props.row.original.totalLeave) -
                        Number(props.row.original.takenLeave)}
                    </Box>
                  ),
                },
              ]}
            />
          </Box>
          <Box
            p="s20"
            display="grid"
            gridTemplateColumns="repeat(3, 1fr)"
            borderBottom="1px"
            borderBottomColor="border.layout"
            gap="s20"
          >
            <Select
              isDisabled
              label="Employee"
              value={{ label: `${user?.firstName?.local}`, value: String(user?.id) }}
            />
            <FormSelect
              name="leaveTypeId"
              label="Leave Type"
              options={leaveTypeData?.employee?.settings?.listLeaveType?.edges?.map((e) => ({
                label: e?.node?.name as string,
                value: e?.node?.id as string,
              }))}
            />
            <FormSelect name="leaveApprover" options={[]} label="Leave Approver" />
          </Box>
          <Box display="flex" flexDir="column" gap="s20" p="s20">
            <Box>
              <Text fontSize="r1" color="gray.700" fontWeight={500}>
                Leave Details
              </Text>
            </Box>
            <Box display="grid" gridTemplateColumns="repeat(3, 1fr)" gap="s20">
              <FormDatePicker name="leaveFromDate" label="From Date" />
              <FormDatePicker name="leaveToDate" label="To Date" />
              <Input isDisabled label="Total Leave Days" value={diff < 0 ? 1 : diff} />
              <GridItem colSpan={3}>
                <FormTextArea rows={6} name="leaveReason" label="Reason" />
              </GridItem>
            </Box>
          </Box>
        </Box>
      </FormProvider>
    </Modal>
  );
};
