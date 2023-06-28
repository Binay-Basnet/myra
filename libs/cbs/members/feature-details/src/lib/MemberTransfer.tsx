import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useRouter } from 'next/router';
import { omit } from 'lodash';

import {
  asyncToast,
  Box,
  Button,
  Divider,
  FormSection,
  GridItem,
  MemberCard,
  Modal,
  Text,
} from '@myra-ui';

import {
  MemberTransferInput,
  MemberTransferState,
  MemberTransferSuccessData,
  useGetIndividualMemberDetails,
  useGetMemberKymDetailsAccountsQuery,
  useGetMemberKymDetailsLoanQuery,
  useGetMemberKymDetailsSharesQuery,
  useGetMemberTransferQuery,
  useMemberTransferActionMutation,
  useMemberTransferInitiateMutation,
} from '@coop/cbs/data-access';
import { ROUTES } from '@coop/cbs/utils';
import {
  FormBranchSelect,
  FormFileInput,
  FormLayout,
  FormMemberSelect,
  FormTextArea,
} from '@coop/shared/form';
import { amountConverter } from '@coop/shared/utils';

export const MemberTransfer = () => {
  const router = useRouter();
  const methods = useForm();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [approvedMemberData, setApprovedMemberData] = useState<MemberTransferSuccessData>();
  const { reset, getValues } = methods;

  const memberId = router?.query?.['memberId'];
  const requestId = router?.query?.['requestId'];
  const isApprove = router?.query?.['type'] === 'approve';

  const { data: transferData } = useGetMemberTransferQuery(
    { requestId: requestId as string },
    { enabled: !!requestId }
  );

  const { mutateAsync } = useMemberTransferInitiateMutation();

  const { mutateAsync: memberTransferActionMutateAsync } = useMemberTransferActionMutation();

  const transferEditdata = transferData?.members?.transfer?.get?.data;

  useEffect(() => {
    if (transferEditdata) {
      reset({ ...transferEditdata, currentBranchId: transferEditdata?.prevBranchId });
    }
  }, [JSON.stringify(transferEditdata)]);

  const { memberDetailData, memberSignatureUrl, memberCitizenshipUrl } =
    useGetIndividualMemberDetails({
      memberId: (memberId as string) || (transferEditdata?.memberId as string),
    });

  const memberShareDetails = useGetMemberKymDetailsSharesQuery({
    id: (memberId as string) || (transferEditdata?.memberId as string),
  });
  const memberShareDetailsData =
    memberShareDetails?.data?.members?.memberOverviewV2?.share?.data?.shareInfo;

  const memberShareDataToBeMapped = [
    { title: 'Share Count', value: memberShareDetailsData?.totalCount },
    { title: 'Share Issued', value: memberShareDetailsData?.issuedCount },
    { title: 'Share Returned', value: memberShareDetailsData?.returnedCount },
    { title: 'Share Balance', value: memberShareDetailsData?.totalBalance },
  ];

  const memberSavingAccountDetails = useGetMemberKymDetailsAccountsQuery({
    id: (memberId as string) || (transferEditdata?.memberId as string),
  });

  const memberSavingAccountsDetailsData =
    memberSavingAccountDetails?.data?.members?.memberOverviewV2?.accounts?.data?.accounts;

  const memberLoanAccountDetails = useGetMemberKymDetailsLoanQuery({
    id: (memberId as string) || (transferEditdata?.memberId as string),
  });

  const memberLoanAccountsDetailsData =
    memberLoanAccountDetails?.data?.members?.memberOverviewV2?.loan?.data?.accounts;

  useEffect(() => {
    if (memberId) {
      reset({
        memberId: memberId as string,
        currentBranchId: router?.query?.['branchId'],
      });
    }
  }, []);

  const handleTransferMember = () => {
    asyncToast({
      id: 'member-transfer-id',
      msgs: {
        success: 'Member transfer successfully initiated',
        loading: 'member transfer initiating',
      },
      onSuccess: () => {
        router.push(ROUTES?.CBS_REQUESTS_MEMBER_TRANSFER_LIST);
      },
      promise: mutateAsync({
        memberId: memberId as string,
        data: { ...(omit(getValues(), ['memberId', 'currentBranchId']) as MemberTransferInput) },
      }),
    });
  };

  const declineTransfer = () => {
    asyncToast({
      id: 'decline-transfer',
      msgs: {
        success: 'Member transfer declined successfully',
        loading: 'Member transfer declining',
      },
      onSuccess: () => {
        router.push(ROUTES?.CBS_REQUESTS_MEMBER_TRANSFER_LIST);
      },
      promise: memberTransferActionMutateAsync({
        requestId: requestId as string,
        state: MemberTransferState?.Rejected,
      }),
    });
  };

  const approveMember = () => {
    asyncToast({
      id: 'approve-transfer',
      msgs: {
        success: 'Member approved successfully',
        loading: 'Member transfer approving',
      },
      onSuccess: (res) => {
        setApprovedMemberData(res?.members?.transfer?.action?.record as MemberTransferSuccessData);
        setIsModalOpen(true);
      },
      promise: memberTransferActionMutateAsync({
        requestId: requestId as string,
        state: MemberTransferState?.Approved,
      }),
    });
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
  };

  return (
    <FormLayout methods={methods}>
      <FormLayout.Header title="Member Transfer" />

      <FormLayout.Content>
        <FormLayout.Form>
          <FormSection>
            <GridItem colSpan={3}>
              <FormMemberSelect name="memberId" label="Member" isDisabled />
            </GridItem>
            <GridItem colSpan={3}>
              <FormBranchSelect name="currentBranchId" label="Current Service Center" isDisabled />
            </GridItem>
            <GridItem colSpan={3}>
              <FormBranchSelect
                name="newBranchId"
                label="New Service Center"
                isDisabled={!!requestId}
              />
            </GridItem>
            <GridItem colSpan={2}>
              <FormTextArea name="reason" label="Reason to transfer" isDisabled={!!requestId} />
            </GridItem>
            <FormFileInput size="sm" name="docs" label="File Upload" />
          </FormSection>
        </FormLayout.Form>
        <FormLayout.Sidebar borderPosition="left">
          <Box display="flex" flexDirection="column" gap="s16">
            <MemberCard
              memberDetails={{
                name: memberDetailData?.name,
                avatar: memberDetailData?.profilePicUrl ?? '',
                memberID: memberDetailData?.id,
                code: memberDetailData?.code,
                gender: memberDetailData?.gender,
                age: memberDetailData?.age,
                maritalStatus: memberDetailData?.maritalStatus,
                dateJoined: memberDetailData?.dateJoined?.en,
                phoneNo: memberDetailData?.contact,
                email: memberDetailData?.email,
                address: memberDetailData?.address,
              }}
              signaturePath={memberSignatureUrl}
              citizenshipPath={memberCitizenshipUrl}
            />
            <Box m="s16" p="s16" border="1px solid" borderColor="gray.200" borderRadius={5}>
              <Text fontSize="s3" fontWeight="medium" mb="s16">
                Share Details
              </Text>

              {memberShareDataToBeMapped?.map((item) => (
                <Box display="flex" justifyContent="space-between">
                  <Text fontSize="s3">{item?.title}</Text>
                  <Text fontSize="s3">{item?.value}</Text>
                </Box>
              ))}
            </Box>
            <Box m="s16" p="s16" border="1px solid" borderColor="gray.200" borderRadius={5}>
              <Text fontSize="s3" fontWeight="medium" mb="s16">
                Saving Account List
              </Text>
              <Box display="flex" justifyContent="space-between" p="s8" bg="gray.100">
                <Text fontSize="s3" fontWeight="medium">
                  Account Name
                </Text>
                <Text fontSize="s3" fontWeight="medium">
                  Balance
                </Text>
              </Box>
              <Divider />
              {memberSavingAccountsDetailsData?.map((item) => (
                <>
                  <Box p="s8" display="flex" justifyContent="space-between">
                    <Text fontSize="s3">{item?.accountName}</Text>
                    <Text fontSize="s3">{amountConverter(item?.totalBalance as string)}</Text>
                  </Box>
                  <Divider />
                </>
              ))}
            </Box>
            <Box m="s16" p="s16" border="1px solid" borderColor="gray.200" borderRadius={5}>
              <Text fontSize="s3" fontWeight="medium" mb="s16">
                Loan Account List
              </Text>
              <Box display="flex" justifyContent="space-between" p="s8" bg="gray.100">
                <Text fontSize="s3" fontWeight="medium">
                  Account Name
                </Text>
                <Text fontSize="s3" fontWeight="medium">
                  Amount
                </Text>
              </Box>
              <Divider />
              {memberLoanAccountsDetailsData?.map((item) => (
                <>
                  <Box p="s8" display="flex" justifyContent="space-between">
                    <Text fontSize="s3">{item?.accountName}</Text>
                    <Text fontSize="s3">{amountConverter(item?.totalBalance as string)}</Text>
                  </Box>
                  <Divider />
                </>
              ))}
            </Box>
          </Box>
        </FormLayout.Sidebar>
      </FormLayout.Content>
      {memberId && (
        <FormLayout.Footer
          mainButtonLabel="Request Transfer"
          mainButtonHandler={handleTransferMember}
        />
      )}
      {isApprove && (
        <FormLayout.Footer
          mainButtonLabel={isApprove ? 'Approve' : 'Request Transfer'}
          draftButton={
            isApprove && (
              <Button variant="outline" onClick={declineTransfer}>
                Decline
              </Button>
            )
          }
          mainButtonHandler={approveMember}
        />
      )}
      <Modal open={isModalOpen} onClose={handleModalClose} isCentered>
        <Box display="flex" flexDir="column">
          <Box alignSelf="center">
            <svg
              width="76"
              height="76"
              viewBox="0 0 76 76"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <rect x="0.285645" width="75.4286" height="75.4286" rx="37.7143" fill="#C2DBCA" />
              <rect x="8.28564" y="8" width="59.4286" height="59.4286" rx="29.7143" fill="white" />
              <path
                d="M37.9999 8C21.6156 8 8.28564 21.33 8.28564 37.7143C8.28564 54.0986 21.6156 67.4286 37.9999 67.4286C54.3842 67.4286 67.7142 54.0986 67.7142 37.7143C67.7142 21.33 54.3842 8 37.9999 8ZM32.5714 52.6257L21.0571 39.83L24.4556 36.7714L32.4556 45.66L51.4285 23.0657L54.9342 26L32.5714 52.6257Z"
                fill="#3D8F5F"
              />
            </svg>
          </Box>
          <Text fontSize="l1" fontWeight="semibold" alignSelf="center" color="primary.500">
            Membership Transfer Successful
          </Text>
          <Text fontSize="r1" textAlign="center">
            The member has been transfered successfully. Details of the members is give below
          </Text>
          <Box p="s8" display="flex" justifyContent="space-between" bg="gray.100">
            <Text fontSize="s3">New Service Center</Text>
            <Text fontSize="s3" fontWeight="medium">
              {approvedMemberData?.newBranch}
            </Text>
          </Box>
          <Box p="s8" display="flex" justifyContent="space-between" bg="gray.100">
            <Text fontSize="s3">Old Service Center</Text>
            <Text fontSize="s3" fontWeight="medium">
              {approvedMemberData?.oldBranch}
            </Text>
          </Box>
          <Divider color="blackAlpha.100" width={2} />
          <Box p="s8" display="flex" bg="gray.100" flexDir="column" gap="s16">
            <Text fontSize="s3" fontWeight="medium">
              List of Saving Accounts Transfered
            </Text>
            {approvedMemberData?.savingAccountList?.map((item, index) => (
              <Text>{`${index + 1}. ${item}`}</Text>
            ))}
          </Box>
          <Divider color="blackAlpha.100" width={2} />
          <Box p="s8" display="flex" bg="gray.100" flexDir="column" gap="s16">
            <Text fontSize="s3" fontWeight="medium">
              List of Loan Accounts Transfered
            </Text>
            {approvedMemberData?.loanAccountList?.map((item, index) => (
              <Text fontSize="s3">{`${index + 1}. ${item}`}</Text>
            ))}
          </Box>
          <Box display="flex" gap="s16" alignSelf="flex-end" mt="s16">
            <Button
              variant="outline"
              onClick={() =>
                router?.push(`${ROUTES?.CBS_MEMBER_TRANSFER}?requestId=${requestId}&&type=details`)
              }
            >
              Go back to member details
            </Button>
            <Button onClick={() => router.push(ROUTES?.CBS_REQUESTS_MEMBER_TRANSFER_LIST)}>
              Done
            </Button>
          </Box>
        </Box>
      </Modal>
    </FormLayout>
  );
};

export default MemberTransfer;
