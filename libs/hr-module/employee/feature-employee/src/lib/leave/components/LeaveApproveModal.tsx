import { asyncToast, Grid, GridItem, Modal, Text } from '@myra-ui';

import { LeaveStatusEnum, useApproveLeaveMutation, useGetLeaveQuery } from '@coop/cbs/data-access';

interface Props {
  selectedLeaveId: string;
  handleClearLeaveId: () => void;
  isApproveModalOpen: boolean;
  handleCloseApproveModal: () => void;
  refetch: () => void;
}

const LeaveApproveModal = (props: Props) => {
  const {
    selectedLeaveId,
    handleClearLeaveId,
    isApproveModalOpen,
    handleCloseApproveModal,
    refetch,
  } = props;

  const { data: leaveData } = useGetLeaveQuery(
    { id: selectedLeaveId as string },
    { enabled: !!selectedLeaveId }
  );

  const leaveDataForApprove = leaveData?.hr?.employee?.leave?.getLeave?.record;

  // const { data: employeeLeaveList } = useGetEmployeeLeaveListQuery(
  //   {
  //     employeeId: leaveDataForApprove?.employeeId as string,
  //   },
  //   { enabled: !!leaveDataForApprove?.employeeId }
  // );

  const { mutateAsync } = useApproveLeaveMutation();

  const handleModalClose = () => {
    handleClearLeaveId();
    handleCloseApproveModal();
  };

  const approveLeave = () => {
    asyncToast({
      id: 'approve-leave',
      msgs: {
        success: 'leave approved succesfully',
        loading: 'approving leave',
      },
      onSuccess: () => {
        refetch();
        handleModalClose();
      },
      promise: mutateAsync({
        id: selectedLeaveId,
        input: LeaveStatusEnum?.Approved,
      }),
    });
  };

  const rejectLeave = () => {
    asyncToast({
      id: 'reject-leave',
      msgs: {
        success: 'leave rejected succesfully',
        loading: 'rejecting leave',
      },
      onSuccess: () => {
        refetch();
        handleModalClose();
      },
      promise: mutateAsync({
        id: selectedLeaveId,
        input: LeaveStatusEnum?.Declined,
      }),
    });
  };

  return (
    <Modal
      open={isApproveModalOpen}
      onClose={handleModalClose}
      isCentered
      title="Leave Request"
      width="xl"
      primaryButtonLabel="Approve Leave"
      secondaryButtonLabel="Reject"
      primaryButtonHandler={approveLeave}
      secondaryButtonHandler={rejectLeave}
    >
      <Grid templateColumns="repeat(2, 1fr)" gap="s16">
        <GridItem>
          <Text fontSize="r1">Leave Type</Text>
          <Text fontSize="r1" fontWeight="semibold">
            -
          </Text>
        </GridItem>
        <GridItem>
          <Text fontSize="r1">Status</Text>
          <Text fontSize="r1" fontWeight="semibold">
            {leaveDataForApprove?.status?.toLowerCase()}
          </Text>
        </GridItem>
        <GridItem>
          <Text fontSize="r1">From Date</Text>
          <Text fontSize="r1" fontWeight="semibold">
            {leaveDataForApprove?.leaveFrom?.local}
          </Text>
        </GridItem>
        <GridItem>
          <Text fontSize="r1">To Date</Text>
          <Text fontSize="r1" fontWeight="semibold">
            {leaveDataForApprove?.leaveTo?.local}
          </Text>
        </GridItem>
        <GridItem>
          <Text fontSize="r1">Reason</Text>
          <Text fontSize="r1" fontWeight="semibold">
            {leaveDataForApprove?.leaveNote}
          </Text>
        </GridItem>
      </Grid>
    </Modal>
  );
};

export default LeaveApproveModal;
