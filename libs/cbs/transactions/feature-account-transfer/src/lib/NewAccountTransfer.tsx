import { useEffect, useMemo } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { useRouter } from 'next/router';
import { useQueryClient } from '@tanstack/react-query';
import omit from 'lodash/omit';

import {
  Box,
  Button,
  Container,
  FormFooter,
  FormHeader,
  MemberCard,
  ResponseDialog,
  Text,
} from '@myra-ui';

import {
  NatureOfDepositProduct,
  ObjState,
  TransferInput,
  TransferType,
  useGetAccountDetailsDataQuery,
  useGetAvailableSlipsListQuery,
  useGetIndividualMemberDetails,
  useSetAccountTransferDataMutation,
  WithdrawWith,
} from '@coop/cbs/data-access';
import {
  BoxContainer,
  ContainerWithDivider,
  InputGroupContainer,
} from '@coop/cbs/transactions/ui-containers';
import { localizedDate, localizedText, ROUTES } from '@coop/cbs/utils';
import {
  FormAccountSelect,
  FormAmountInput,
  FormInput,
  FormMemberSelect,
  FormSelect,
  FormSwitchTab,
  FormTextArea,
} from '@coop/shared/form';
import {
  amountConverter,
  amountToWordsConverter,
  featureCode,
  useTranslation,
} from '@coop/shared/utils';

/* eslint-disable-next-line */
export interface NewAccountTransferProps {}

type AccountTransferForm = TransferInput & { destMemberId: string };

const transferTypeObj = {
  [TransferType.Self]: 'Self Transfer',
  [TransferType.Member]: 'Member to Member',
};

export const NewAccountTransfer = () => {
  const { t } = useTranslation();

  const queryClient = useQueryClient();

  const accountTypes = {
    [NatureOfDepositProduct.Current]: t['depositProductCurrent'],
    [NatureOfDepositProduct.RecurringSaving]: t['addDepositRecurringSavingAccount'],
    [NatureOfDepositProduct.TermSavingOrFd]: t['addDepositTermSavingAccount'],
    [NatureOfDepositProduct.Saving]: t['depositProductSaving'],
  };

  const withdrawTypes = [
    { label: t['addWithdrawWithdrawSlip'], value: WithdrawWith.WithdrawSlip },
    { label: 'Counter Slip', value: WithdrawWith.CounterSlip },
  ];

  const transferTypes = [
    { label: t['newAccountTransferSelfTransfer'], value: TransferType.Self },
    { label: t['newAccountTransferMemberToMember'], value: TransferType.Member },
  ];

  const router = useRouter();

  const methods = useForm<AccountTransferForm>({
    defaultValues: {
      transferType: TransferType.Self,
      withdrawWith: WithdrawWith.WithdrawSlip,
    },
  });

  const { watch, reset, getValues } = methods;

  const memberId = watch('memberId');

  useEffect(() => {
    reset({
      memberId,
      srcAccountId: '',
      amount: '',
      transferType: TransferType.Self,
      withdrawWith: WithdrawWith.WithdrawSlip,
    });
  }, [memberId]);

  const destMemberId = watch('destMemberId');

  const { memberDetailData, memberCitizenshipUrl } = useGetIndividualMemberDetails({ memberId });

  const {
    memberDetailData: destMemberDetailData,
    memberSignatureUrl: destMemberSignatureUrl,
    memberCitizenshipUrl: destMemberCitizenshipUrl,
  } = useGetIndividualMemberDetails({ memberId: destMemberId });

  // const { data: destAccountListData } = useGetAccountTableListQuery(
  //   {
  //     paginate: {
  //       first: DEFAULT_PAGE_SIZE,
  //       after: '',
  //     },
  //     filter: { memberId: destMemberId },
  //   },
  //   {
  //     staleTime: 0,
  //     enabled: !!destMemberId,
  //   }
  // );

  const srcAccountId = watch('srcAccountId');

  const { data: accountDetailQueryData } = useGetAccountDetailsDataQuery(
    { id: srcAccountId as string },
    { enabled: !!srcAccountId }
  );

  const sourceAccount = useMemo(
    () => accountDetailQueryData?.account?.accountDetails?.data,
    [accountDetailQueryData]
  );

  const transferType = watch('transferType');

  const withdrawn = watch('withdrawWith');

  const { data: availableSlipsListQueryData } = useGetAvailableSlipsListQuery(
    { accountId: srcAccountId },
    { enabled: !!srcAccountId }
  );

  const availableSlipListOptions = useMemo(
    () =>
      availableSlipsListQueryData?.withdrawSlip?.listAvailableSlips?.data?.map((withdrawSlip) => ({
        label: String(withdrawSlip?.slipNumber).padStart(10, '0'),
        value: withdrawSlip?.slipNumber as string,
      })) ?? [],
    [availableSlipsListQueryData]
  );

  const totalDeposit = watch('amount') || 0;

  const { mutateAsync } = useSetAccountTransferDataMutation();

  const handleSubmit = () => {
    const values = getValues();

    return omit(values, ['destMemberId']);
  };
  //  get redirect id from url
  const redirectMemberId = router.query['memberId'];
  const redirectSrcAccountId = router.query['srcAccountId'];

  // redirect from member details
  useEffect(() => {
    if (redirectMemberId) {
      methods.setValue('memberId', String(redirectMemberId));
    }
  }, [redirectMemberId]);

  useEffect(() => {
    if (redirectSrcAccountId && memberId) {
      methods.setValue('srcAccountId', String(redirectSrcAccountId));
    }
  }, [memberId, redirectSrcAccountId]);

  return (
    <>
      <Container minW="container.xl" height="fit-content">
        <Box position="sticky" top="0" bg="gray.100" width="100%" zIndex="10">
          <FormHeader
            title={`${t['newAccountTransferNewAccountTransfer']} - ${featureCode?.newAccountTransfer}`}
          />
        </Box>

        <Box bg="white">
          <FormProvider {...methods}>
            <form>
              <Box display="flex" minH="calc(100vh - 170px)">
                <Box
                  p="s16"
                  pb="100px"
                  width="100%"
                  display="flex"
                  flexDirection="column"
                  gap="s24"
                  borderRight="1px"
                  borderColor="border.layout"
                >
                  <ContainerWithDivider>
                    <BoxContainer>
                      <FormMemberSelect
                        isRequired
                        name="memberId"
                        label={t['newAccountTransferMember']}
                        isDisabled={!!redirectMemberId}
                      />

                      {memberId && (
                        <FormAccountSelect
                          name="srcAccountId"
                          label={t['newAccountTransferSourceAccount']}
                          memberId={memberId}
                          filterBy={ObjState.Active}
                          isLinkedAccounts
                          isDisabled={!!redirectSrcAccountId}
                        />
                      )}
                    </BoxContainer>

                    {srcAccountId && (
                      <BoxContainer>
                        <FormSwitchTab
                          name="transferType"
                          label={t['newAccountTransferTransferType']}
                          options={transferTypes}
                        />

                        {transferType === TransferType.Self && (
                          <FormAccountSelect
                            isRequired
                            name="destAccountId"
                            label={t['newAccountTransferReceipentAccount']}
                            memberId={memberId}
                            filterBy={ObjState.Active}
                            excludeIds={[srcAccountId]}
                            isLinkedAccounts
                          />
                        )}

                        {transferType === TransferType.Member && (
                          <>
                            <FormMemberSelect
                              name="destMemberId"
                              label={t['newAccountTransferReceipentMember']}
                              excludeIds={[memberId]}
                              forceEnableAll
                            />

                            <FormAccountSelect
                              isRequired
                              name="destAccountId"
                              label={t['newAccountTransferReceipentAccount']}
                              memberId={destMemberId}
                              filterBy={ObjState.Active}
                            />
                          </>
                        )}
                      </BoxContainer>
                    )}

                    {srcAccountId && transferType && (
                      <BoxContainer>
                        <FormSwitchTab
                          name="withdrawWith"
                          label="Withdraw By"
                          options={withdrawTypes}
                        />

                        {withdrawn === WithdrawWith.WithdrawSlip && (
                          <InputGroupContainer>
                            <FormSelect
                              name="withdrawSlipNo"
                              label="Withdraw Slip No"
                              options={availableSlipListOptions}
                            />
                          </InputGroupContainer>
                        )}

                        {withdrawn === WithdrawWith.CounterSlip && (
                          <InputGroupContainer>
                            <FormInput name="counterSlipNo" label="Counter Slip No" />
                          </InputGroupContainer>
                        )}
                      </BoxContainer>
                    )}

                    {srcAccountId && transferType && (
                      <BoxContainer>
                        <InputGroupContainer>
                          <FormAmountInput
                            type="number"
                            name="amount"
                            label={t['newAccountTransferTransferAmount']}
                          />
                        </InputGroupContainer>

                        <FormTextArea name="notes" label={t['newAccountTransferNote']} rows={5} />
                      </BoxContainer>
                    )}
                  </ContainerWithDivider>
                </Box>

                {memberId && (
                  <Box>
                    <MemberCard
                      memberDetails={{
                        name: memberDetailData?.name,
                        code: memberDetailData?.code,
                        avatar: memberDetailData?.profilePicUrl ?? '',
                        memberID: memberDetailData?.id,
                        gender: memberDetailData?.gender,
                        age: memberDetailData?.age,
                        maritalStatus: memberDetailData?.maritalStatus,
                        dateJoined: memberDetailData?.dateJoined,
                        // branch: 'Basantapur',
                        phoneNo: memberDetailData?.contact,
                        email: memberDetailData?.email,
                        address: memberDetailData?.address,
                      }}
                      // notice="KYM needs to be updated"
                      signaturePath={sourceAccount?.member?.signaturePicUrl ?? ''}
                      citizenshipPath={memberCitizenshipUrl}
                      accountInfo={
                        sourceAccount
                          ? {
                              name: sourceAccount?.accountName as string,
                              type: sourceAccount?.product?.nature
                                ? accountTypes[sourceAccount?.product?.nature]
                                : '',
                              ID: sourceAccount?.accountId,
                              currentBalance: sourceAccount?.availableBalance ?? '0',
                              actualBalance: sourceAccount?.accountBalance ?? '0',
                              minimumBalance: sourceAccount?.product?.minimumBalance ?? '0',
                              interestAccured: sourceAccount?.interestAccrued ?? '0',
                              guaranteeBalance: sourceAccount?.guaranteedAmount ?? '0',
                              overdrawnBalance: sourceAccount?.overDrawnBalance ?? '0',
                              fine: sourceAccount?.dues?.fine ?? 0,
                              // branch: 'Kumaripati',
                              openDate: localizedDate(sourceAccount?.accountOpenDate) ?? 'N/A',
                              expiryDate: localizedDate(sourceAccount?.accountExpiryDate) ?? 'N/A',
                              lastTransactionDate:
                                localizedDate(sourceAccount?.lastTransactionDate) ?? 'N/A',
                              productName: sourceAccount?.product?.productName,
                              installmentAmount:
                                sourceAccount?.product?.nature ===
                                  NatureOfDepositProduct.RecurringSaving ||
                                (sourceAccount?.product?.nature === NatureOfDepositProduct.Saving &&
                                  sourceAccount?.product?.isMandatorySaving)
                                  ? sourceAccount?.installmentAmount
                                  : null,
                            }
                          : null
                      }
                      redirectUrl={`${ROUTES.CBS_ACCOUNT_SAVING_DETAILS}?id=${sourceAccount?.accountId}`}
                    />

                    {destMemberId && (
                      <Box borderTop="1px" borderColor="border.layout">
                        <MemberCard
                          cardTitle={t['newAccountTransferReceipentMemberInfo']}
                          memberDetails={{
                            name: destMemberDetailData?.name,
                            code: destMemberDetailData?.code,
                            avatar: destMemberDetailData?.profilePicUrl ?? '',
                            memberID: destMemberDetailData?.id,
                            gender: destMemberDetailData?.gender,
                            age: destMemberDetailData?.age,
                            maritalStatus: destMemberDetailData?.maritalStatus,
                            dateJoined: destMemberDetailData?.dateJoined,
                            // branch: 'Basantapur',
                            phoneNo: destMemberDetailData?.contact,
                            email: destMemberDetailData?.email,
                            address: destMemberDetailData?.address,
                          }}
                          // notice="KYM needs to be updated"
                          signaturePath={destMemberSignatureUrl}
                          citizenshipPath={destMemberCitizenshipUrl}
                        />
                      </Box>
                    )}
                  </Box>
                )}
              </Box>
            </form>
          </FormProvider>
        </Box>
      </Container>

      <Box position="relative" margin="0px auto">
        <Box bottom="0" position="fixed" width="100%" bg="gray.100" zIndex={10}>
          <Container minW="container.xl" height="fit-content">
            <FormFooter
              mainButton={
                <ResponseDialog
                  onSuccess={() => {
                    if (methods.getValues().withdrawWith === WithdrawWith.WithdrawSlip) {
                      queryClient.invalidateQueries(['getAvailableSlipsList']);
                      queryClient.invalidateQueries(['getPastSlipsList']);
                    }
                    router.push(ROUTES.CBS_TRANS_ACCOUNT_TRANSFER_LIST);
                  }}
                  promise={() => mutateAsync({ data: handleSubmit() })}
                  successCardProps={(response) => {
                    const result = response?.transaction?.transfer?.record;
                    return {
                      type: 'Account Transfer',
                      total: amountConverter(result?.totalAmount || 0) as string,
                      totalWords: amountToWordsConverter(result?.amount || 0),
                      title: 'Account Transfer Successful',
                      details: {
                        'Transaction Id': (
                          <Text fontSize="s3" color="primary.500" fontWeight="600">
                            {result?.id}
                          </Text>
                        ),
                        Date: localizedDate(result?.date),
                        'Withdraw By': `${result?.withdrawWith} (${
                          result?.withdrawWith === WithdrawWith.WithdrawSlip
                            ? result?.slipNo?.padStart(10, '0') ?? 'N/A'
                            : result?.slipNo
                        })`,
                        'Transfer Type': result?.transferType
                          ? transferTypeObj[result.transferType]
                          : '',
                        'Recipient Name': localizedText(result?.receiverMemberName),
                        'Recipient Account Name': result?.receiverAccountName,

                        'Transfer Amount': amountConverter(result?.amount || 0) as string,
                        Fine: String(amountConverter(result?.fine || 0)),
                      },
                      subTitle:
                        'Amount transferred successfully. Details of the transaction is listed below',
                      meta: {
                        memberId: result?.senderMemberId,
                        accountId: result?.senderAccountId,
                        accountName: result?.senderAccountName,
                        member: localizedText(result?.senderMemberName),
                      },
                    };
                  }}
                  errorCardProps={{
                    title: 'New Deposit Failed',
                  }}
                >
                  <Button width="160px">Proceed Transaction</Button>
                </ResponseDialog>
              }
              status={
                <Box display="flex" gap="s32">
                  <Text fontSize="r1" fontWeight={600} color="neutralColorLight.Gray-50">
                    {t['newAccountTransferTotalTransferAmount']}
                  </Text>
                  <Text fontSize="r1" fontWeight={600} color="neutralColorLight.Gray-70">
                    {amountConverter(totalDeposit) ?? '---'}
                  </Text>
                </Box>
              }
              mainButtonLabel="Submit"
              mainButtonHandler={handleSubmit}
            />
          </Container>
        </Box>
      </Box>
    </>
  );
};

export default NewAccountTransfer;
