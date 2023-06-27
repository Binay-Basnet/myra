import { useEffect } from 'react';
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
  Text,
} from '@myra-ui';

import {
  MemberTransferInput,
  MemberTransferState,
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
          mainButtonHandler={handleTransferMember}
        />
      )}
    </FormLayout>
  );
};

export default MemberTransfer;
