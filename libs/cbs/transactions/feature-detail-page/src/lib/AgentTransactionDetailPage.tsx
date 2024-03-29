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
  Loader,
  Modal,
  Table,
  Text,
} from '@myra-ui';

import {
  TodayListStatus,
  useAcceptAgentTodayDepositMutation,
  useAgentTodayTaskDetailQuery,
  useAppSelector,
  useRejectTodayTaskMutation,
} from '@coop/cbs/data-access';
import { getAmountToCollect } from '@coop/cbs/transactions/agent';
import { localizedText } from '@coop/cbs/utils';
import { FormLayout, FormTextArea } from '@coop/shared/form';
import { amountConverter, getUrl } from '@coop/shared/utils';

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

  const user = useAppSelector((state) => state?.auth?.user);

  const isTellerOrHeadTeller =
    user?.currentRole?.name === 'Teller' || user?.currentRole?.name === 'Head Teller';

  const id = router?.query?.['id'];

  const queryClient = useQueryClient();

  const methods = useForm<TodaysList>();

  const { watch, reset } = methods;

  const {
    isOpen: isDeclineModalOpen,
    onClose: onDeclineModalClose,
    onToggle: onDeclineModalToggle,
  } = useDisclosure();

  const { data: agentTaskDetailData, isFetching } = useAgentTodayTaskDetailQuery({
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
        cell: (props) => (
          <Box display="flex" flexDirection="column">
            <Text>{`${props?.row?.original?.account?.accountName} [${props?.row?.original?.account?.id}]`}</Text>
            <Text>
              {getAmountToCollect(
                Number(props?.row?.original?.amountToBeCollected),
                Number(props?.row?.original?.fineToBeCollected),
                Number(props?.row?.original?.account?.installmentAmount)
              )}
            </Text>
          </Box>
        ),
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
        router.push(`/${getUrl(router.pathname, 3)}/list`);
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
        router.push(`/${getUrl(router.pathname, 3)}/list`);
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

        {isFetching && <Loader />}

        {!isFetching && (
          <>
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
                        Accounts Collected
                      </Text>
                      <Text fontSize="r1" fontWeight={500} color="gray.700">
                        {accounts?.filter(
                          (a) => Number(a?.amountCollected) || Number(a?.fineCollected)
                        )?.length || 0}{' '}
                        / {accounts?.length}
                      </Text>
                    </Box>
                    <Box display="flex" justifyContent="space-between">
                      <Text fontSize="r1" fontWeight={500} color="gray.700">
                        Amount Collected
                      </Text>
                      <Text fontSize="r1" fontWeight={500} color="gray.700">
                        {amountConverter(totalAmount)}
                      </Text>
                    </Box>
                    <Box display="flex" justifyContent="space-between">
                      <Text fontSize="r1" fontWeight={500} color="gray.700">
                        Fine Collected
                      </Text>
                      <Text fontSize="r1" fontWeight={500} color="gray.700">
                        {amountConverter(totalFine)}
                      </Text>
                    </Box>
                    <Box display="flex" justifyContent="space-between">
                      <Text fontSize="r1" fontWeight={500} color="gray.700">
                        Total Collection
                      </Text>
                      <Text fontSize="r1" fontWeight={500} color="gray.700">
                        {amountConverter(totalAmount)}
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
                    disabled={!isTellerOrHeadTeller}
                  >
                    Decline with a Note
                  </Button>
                ) : null
              }
              mainButton={
                submissionStatus === TodayListStatus.Pending ? (
                  <Button
                    onClick={handleAcceptRequest}
                    minWidth="160px"
                    disabled={!isTellerOrHeadTeller}
                  >
                    Approve Transaction
                  </Button>
                ) : null
              }
            />
          </>
        )}
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
