import { useMemo } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { useDeepCompareEffect } from 'react-use';
import { useRouter } from 'next/router';
import { useDisclosure } from '@chakra-ui/react';
import { useQueryClient } from '@tanstack/react-query';

import {
  Alert,
  asyncToast,
  Avatar,
  Box,
  Button,
  Column,
  FormSection,
  Modal,
  Table,
  Text,
} from '@myra-ui';

import {
  TodayListStatus,
  useAcceptAgentTodayDepositMutation,
  useAgentTodayTaskDetailQuery,
  useRejectTodayTaskMutation,
} from '@coop/cbs/data-access';
import { localizedText, ROUTES } from '@coop/cbs/utils';
import { FormLayout, FormTextArea } from '@coop/shared/form';
import { amountConverter } from '@coop/shared/utils';

type AccountsEntry = {
  id?: string;
  memberId: string;
  memberName: string;
  memberCode: string;
  accountId: string;
  accountName: string;
  amountToBeCollected: string;
  fineToBeCollected: string;
  amountCollected: string;
  fineCollected: string;
};

type TodaysList = {
  accounts: AccountsEntry[];
};
export const AgentTransactionDetailPage = () => {
  const router = useRouter();

  const id = router?.query?.['id'];

  const queryClient = useQueryClient();

  const methods = useForm<TodaysList>();

  const { watch, reset } = methods;

  const {
    isOpen: isDeclineModalOpen,
    onClose: onDeclineModalClose,
    onToggle: onDeclineModalToggle,
  } = useDisclosure();

  const { data: agentTaskDetailData } = useAgentTodayTaskDetailQuery({
    id: id as string,
  });

  const { submissionStatus, agentDetail, collectedDate, rejectReason } = useMemo(
    () => ({
      agentDetail: { ...agentTaskDetailData?.agent?.agentTodayTaskDetail?.agent?.data },
      collectedDate: agentTaskDetailData?.agent?.agentTodayTaskDetail?.date,
      submissionStatus: agentTaskDetailData?.agent?.agentTodayTaskDetail?.status,
      rejectReason: agentTaskDetailData?.agent?.agentTodayTaskDetail?.remark,
    }),
    [agentTaskDetailData]
  );

  const taskList = useMemo(
    () => agentTaskDetailData?.agent?.agentTodayTaskDetail?.record ?? [],
    [agentTaskDetailData]
  );

  useDeepCompareEffect(() => {
    if (taskList) {
      reset({
        accounts: taskList?.map((record) => ({
          id: record?.id,
          memberId: record?.member?.id,
          memberName: record?.member?.name?.en,
          memberCode: record?.member?.code,
          accountId: record?.account?.id,
          accountName: record?.account?.accountName,
          amountToBeCollected: record?.amountToBeCollected,
          fineToBeCollected: record?.fineToBeCollected,
          amountCollected: record?.amount,
          fineCollected: record?.fine,
        })) as AccountsEntry[],
      });
    }
  }, [taskList]);

  const accounts = watch('accounts');

  const columns = useMemo<Column<typeof taskList[0]>[]>(
    () => [
      {
        id: 'member',
        header: 'Member',
        accessorFn: (row) => `${localizedText(row?.member?.name)} [${row?.member?.code}]`,
      },
      {
        id: 'Account',
        header: 'Account',
        accessorFn: (row) => `${row?.account?.accountName} [${row?.account?.id}]`,
      },
      {
        header: 'Amount',
        accessorFn: (row) => amountConverter(row?.amount || 0),
      },
      {
        header: 'Fine',
        accessorFn: (row) => amountConverter(row?.fine || 0),
      },
      {
        header: 'Amount to be Collected',
        accessorFn: (row) => amountConverter(row?.amountToBeCollected || 0),
      },
      {
        header: 'Fine to be Collected',
        accessorFn: (row) => amountConverter(row?.fineToBeCollected || 0),
      },
    ],
    []
  );

  const { mutateAsync: rejectTodayTask } = useRejectTodayTaskMutation();

  const handleDeclineRequest = (reason: string) => {
    asyncToast({
      id: 'reject-mr-collection-request',
      msgs: {
        loading: 'Rejecting Collection Request',
        success: 'Collection Request Rejected',
      },
      promise: rejectTodayTask({ id: id as string, remark: reason }),
      onSuccess: () => {
        queryClient.invalidateQueries(['listMRSubmissionList']);
        router.push(ROUTES.CBS_TRANS_MARKET_REPRESENTATIVE_LIST);
      },
    });
  };

  const { mutateAsync: acceptTodayTask } = useAcceptAgentTodayDepositMutation();

  const handleAcceptRequest = () => {
    asyncToast({
      id: 'accept-mr-collection-request',
      msgs: {
        loading: 'Accepting Collection Request',
        success: 'Collection Request Accepted',
      },
      promise: acceptTodayTask({ id: id as string }),
      onSuccess: () => {
        queryClient.invalidateQueries(['listMRSubmissionList']);
        router.push(ROUTES.CBS_OTHERS_MARKET_REPRESENTATIVE_TRANSACTIONS_LIST);
      },
    });
  };

  const { totalAmount, totalFine } = useMemo(
    () => ({
      totalAmount: accounts?.reduce((sum, acc) => sum + Number(acc?.amountCollected || 0), 0),
      totalFine: accounts?.reduce((sum, acc) => sum + Number(acc?.fineCollected || 0), 0),
    }),
    [accounts]
  );

  return (
    <>
      <FormLayout methods={methods} hasSidebar>
        <FormLayout.Header
          title="Market Representative Collection Request"
          buttonHandler={() => router.back()}
        />

        <FormLayout.Content>
          <FormLayout.Form>
            <FormSection header="Request By" templateColumns={1}>
              <Box
                p="s12"
                border="1px"
                borderColor="border.layout"
                borderRadius="br3"
                display="flex"
                justifyContent="space-between"
                width="100%"
              >
                <Box display="flex" alignItems="center" gap="s8">
                  <Avatar
                    name={agentDetail?.name as string}
                    size="md"
                    src={agentDetail?.profilePicUrl as string}
                    // onClick={() =>
                    //   handleModalOpen(memberDetails.avatar as string, memberDetails.name ?? 'Member')
                    // }
                    // cursor="pointer"
                  />

                  <Text fontSize="r1" fontWeight={500} color="primary.500">
                    {agentDetail?.name}
                  </Text>
                </Box>
                <Box display="flex" flexDirection="column" gap="s4">
                  <Text fontSize="s3" fontWeight={400} color="gray.600">
                    Collection Date
                  </Text>
                  <Text fontSize="r1" fontWeight={500} color="gray.800">
                    {collectedDate?.split(' ')[0]}
                  </Text>
                </Box>
              </Box>
            </FormSection>

            <FormSection
              templateColumns={1}
              divider={false}
              header="All Collections"
              subHeader="Review all collections and Verify/Decline with a Note."
            >
              <Table isDetailPageTable isStatic data={taskList} columns={columns} />

              {rejectReason && (
                <Alert title={`Reject reason: ${rejectReason}`} status="error" hideCloseIcon />
              )}

              <Box
                display="flex"
                flexDirection="column"
                gap="s4"
                p="s16"
                bg="background.500"
                borderRadius="br2"
              >
                <Box display="flex" justifyContent="space-between">
                  <Text fontSize="r1" fontWeight={500} color="gray.700">
                    Total Accounts
                  </Text>
                  <Text fontSize="r1" fontWeight={500} color="gray.700">
                    {accounts?.filter((a) => !!a?.amountCollected)?.length || 0}
                  </Text>
                </Box>
                <Box display="flex" justifyContent="space-between">
                  <Text fontSize="r1" fontWeight={500} color="gray.700">
                    Total Amount
                  </Text>
                  <Text fontSize="r1" fontWeight={500} color="gray.700">
                    {amountConverter(totalAmount)}
                  </Text>
                </Box>
                <Box display="flex" justifyContent="space-between">
                  <Text fontSize="r1" fontWeight={500} color="gray.700">
                    Total Fine
                  </Text>
                  <Text fontSize="r1" fontWeight={500} color="gray.700">
                    {amountConverter(totalFine)}
                  </Text>
                </Box>
                <Box display="flex" justifyContent="space-between">
                  <Text fontSize="r1" fontWeight={500} color="gray.700">
                    Total Collected
                  </Text>
                  <Text fontSize="r1" fontWeight={500} color="gray.700">
                    {amountConverter(totalFine + totalAmount)}
                  </Text>
                </Box>
              </Box>
            </FormSection>
          </FormLayout.Form>
        </FormLayout.Content>

        <FormLayout.Footer
          draftButton={
            submissionStatus === TodayListStatus.Pending ? (
              <Button
                onClick={onDeclineModalToggle}
                variant="ghost"
                shade="danger"
                minWidth="160px"
              >
                Decline with a Note
              </Button>
            ) : null
          }
          mainButton={
            submissionStatus === TodayListStatus.Pending ? (
              <Button onClick={handleAcceptRequest} minWidth="160px">
                Approve Transaction
              </Button>
            ) : null
          }
        />
      </FormLayout>

      <DeclineCollectionRequestModal
        isOpen={isDeclineModalOpen}
        onClose={onDeclineModalClose}
        handleDecline={handleDeclineRequest}
      />
    </>
  );
};

export default AgentTransactionDetailPage;

interface DeclineCollectionRequestModalProps {
  isOpen: boolean;
  onClose: () => void;
  handleDecline: (reason: string) => void;
}

const DeclineCollectionRequestModal = ({
  isOpen,
  onClose,
  handleDecline,
}: DeclineCollectionRequestModalProps) => {
  const methods = useForm<{ reason: string }>();

  const handleClose = () => {
    methods.reset({ reason: '' });
    onClose();
  };

  return (
    <Modal
      open={isOpen}
      onClose={handleClose}
      title="Decline Collection Request"
      primaryButtonLabel="Decline"
      primaryButtonHandler={methods.handleSubmit(() => handleDecline(methods.getValues()?.reason))}
      hidePadding
    >
      <FormProvider {...methods}>
        <FormSection templateColumns={1}>
          <FormTextArea
            name="reason"
            label="Reason"
            rules={{ required: 'Reason is required to reject.' }}
          />
        </FormSection>
      </FormProvider>
    </Modal>
  );
};
