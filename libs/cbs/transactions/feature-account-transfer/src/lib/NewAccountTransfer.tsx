import { useEffect, useMemo } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { useRouter } from 'next/router';
import omit from 'lodash/omit';

import {
  NatureOfDepositProduct,
  TransferInput,
  TransferType,
  useGetAccountTableListQuery,
  useSetAccountTransferDataMutation,
  WithdrawWith,
} from '@coop/cbs/data-access';
import { FormCustomSelect, MemberSelect } from '@coop/cbs/transactions/ui-components';
import {
  BoxContainer,
  ContainerWithDivider,
  InputGroupContainer,
} from '@coop/cbs/transactions/ui-containers';
import { FormInput, FormSwitchTab, FormTextArea } from '@coop/shared/form';
import {
  Box,
  Container,
  DEFAULT_PAGE_SIZE,
  FormFooter,
  FormHeader,
  MemberCard,
  Text,
} from '@coop/shared/ui';
import { featureCode, useGetIndividualMemberDetails } from '@coop/shared/utils';

/* eslint-disable-next-line */
export interface NewAccountTransferProps {}

const accountTypes = {
  [NatureOfDepositProduct.Mandatory]: 'Mandatory Saving Account',
  [NatureOfDepositProduct.RecurringSaving]: 'Recurring Saving Account',
  [NatureOfDepositProduct.TermSavingOrFd]: 'Term Saving Account',
  [NatureOfDepositProduct.VoluntaryOrOptional]: 'Voluntary Saving Account',
};

const FINE = '0';
const REBATE = '0';

const transferTypes = [
  { label: 'Self Transfer', value: TransferType.Self },
  { label: 'Member to Member', value: TransferType.Member },
];

const withdrawTypes = [
  { label: 'Cheque', value: WithdrawWith.Cheque },
  { label: 'Withdraw Slip', value: WithdrawWith.WithdrawSlip },
];

type AccountTransferForm = TransferInput & { destMemberId: string };

export const NewAccountTransfer = () => {
  const router = useRouter();

  const methods = useForm<AccountTransferForm>({
    defaultValues: {
      transferType: TransferType.Self,
      withdrawWith: WithdrawWith.Cheque,
    },
  });

  const { watch, reset, getValues } = methods;

  const memberId = watch('memberId');

  const { data: accountListData } = useGetAccountTableListQuery(
    {
      paginate: {
        first: DEFAULT_PAGE_SIZE,
        after: '',
      },
      filter: { memberId },
    },
    {
      staleTime: 0,
      enabled: !!memberId,
    }
  );

  useEffect(() => {
    reset({
      memberId,
      srcAccountId: '',
      amount: '',
      transferType: TransferType.Self,
      withdrawWith: WithdrawWith.Cheque,
    });
  }, [memberId]);

  const destMemberId = watch('destMemberId');

  const { memberDetailData, memberSignatureUrl, memberCitizenshipUrl } =
    useGetIndividualMemberDetails({ memberId });

  const {
    memberDetailData: destMemberDetailData,
    memberSignatureUrl: destMemberSignatureUrl,
    memberCitizenshipUrl: destMemberCitizenshipUrl,
  } = useGetIndividualMemberDetails({ memberId: destMemberId });

  const { data: destAccountListData } = useGetAccountTableListQuery(
    {
      paginate: {
        first: DEFAULT_PAGE_SIZE,
        after: '',
      },
      filter: { memberId: destMemberId },
    },
    {
      staleTime: 0,
      enabled: !!destMemberId,
    }
  );

  const srcAccountId = watch('srcAccountId');

  const transferType = watch('transferType');

  const withdrawn = watch('withdrawWith');

  const sourceAccount = useMemo(
    () =>
      accountListData?.account?.list?.edges?.find((account) => account.node?.id === srcAccountId)
        ?.node,
    [srcAccountId]
  );

  const amountToBeDeposited = watch('amount') ?? 0;

  const totalDeposit = useMemo(
    () => (amountToBeDeposited ? Number(amountToBeDeposited) + Number(FINE) - Number(REBATE) : 0),
    [amountToBeDeposited]
  );

  const { mutateAsync } = useSetAccountTransferDataMutation();

  const handleSubmit = () => {
    const values = getValues();

    mutateAsync({ data: omit(values, ['destMemberId']) }).then((res) => {
      if (res?.transaction?.transfer?.recordId) {
        router.push('/transactions/account-transfer/list');
      }
    });
  };

  return (
    <>
      <Container minW="container.xl" height="fit-content">
        <Box position="sticky" top="110px" bg="gray.100" width="100%" zIndex="10">
          <FormHeader
            title={`New Account Transfer - ${featureCode?.newAccountTransfer}`}
            closeLink="/transactions/account-transfer/list"
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
                      <MemberSelect name="memberId" label="Member" __placeholder="Select Member" />

                      {memberId && (
                        <FormCustomSelect
                          name="srcAccountId"
                          label="Source Account"
                          __placeholder="Select Account"
                          options={accountListData?.account?.list?.edges?.map((account) => ({
                            accountInfo: {
                              accountName: account.node?.product.productName,
                              accountId: account.node?.product?.id,
                              accountType: account?.node?.product?.nature
                                ? accountTypes[account?.node?.product?.nature]
                                : '',
                              balance: account?.node?.balance ?? '0',
                              fine:
                                account?.node?.product?.nature ===
                                  NatureOfDepositProduct.RecurringSaving ||
                                account?.node?.product?.nature === NatureOfDepositProduct.Mandatory
                                  ? FINE
                                  : '',
                            },
                            value: account.node?.id as string,
                          }))}
                        />
                      )}
                    </BoxContainer>

                    {srcAccountId && (
                      <BoxContainer>
                        <FormSwitchTab
                          name="transferType"
                          label="Transfer Type"
                          options={transferTypes}
                        />

                        {transferType === TransferType.Self && (
                          <FormCustomSelect
                            name="destAccountId"
                            label="Receipent Account"
                            __placeholder="Select Receipent Account"
                            options={accountListData?.account?.list?.edges?.map((account) => ({
                              accountInfo: {
                                accountName: account.node?.product.productName,
                                accountId: account.node?.product?.id,
                                accountType: account?.node?.product?.nature
                                  ? accountTypes[account?.node?.product?.nature]
                                  : '',
                                balance: account?.node?.balance ?? '0',
                                fine:
                                  account?.node?.product?.nature ===
                                    NatureOfDepositProduct.RecurringSaving ||
                                  account?.node?.product?.nature ===
                                    NatureOfDepositProduct.Mandatory
                                    ? FINE
                                    : '',
                              },
                              value: account.node?.id as string,
                            }))}
                          />
                        )}

                        {transferType === TransferType.Member && (
                          <>
                            <MemberSelect
                              name="destMemberId"
                              label="Receipent Member"
                              __placeholder="Select Receipent Member"
                            />

                            <FormCustomSelect
                              name="destAccountId"
                              label="Receipent Account"
                              __placeholder="Select Receipent Account"
                              options={destAccountListData?.account?.list?.edges?.map(
                                (account) => ({
                                  accountInfo: {
                                    accountName: account.node?.product.productName,
                                    accountId: account.node?.product?.id,
                                    accountType: account?.node?.product?.nature
                                      ? accountTypes[account?.node?.product?.nature]
                                      : '',
                                    balance: account?.node?.balance ?? '0',
                                    fine:
                                      account?.node?.product?.nature ===
                                        NatureOfDepositProduct.RecurringSaving ||
                                      account?.node?.product?.nature ===
                                        NatureOfDepositProduct.Mandatory
                                        ? FINE
                                        : '',
                                  },
                                  value: account.node?.id as string,
                                })
                              )}
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

                        {withdrawn === WithdrawWith.Cheque && (
                          <InputGroupContainer>
                            <FormInput
                              name="chequeNo"
                              label="Cheque No"
                              __placeholder="Cheque No"
                            />
                          </InputGroupContainer>
                        )}

                        {withdrawn === WithdrawWith.WithdrawSlip && (
                          <InputGroupContainer>
                            <FormInput
                              name="withdrawSlipNo"
                              label="Withdraw Slip No"
                              __placeholder="Withdraw Slip No"
                            />
                          </InputGroupContainer>
                        )}
                      </BoxContainer>
                    )}

                    {srcAccountId && transferType && (
                      <BoxContainer>
                        <InputGroupContainer>
                          <FormInput
                            type="number"
                            min={0}
                            name="amount"
                            label="Transfer Amount"
                            textAlign="right"
                            __placeholder="0.0"
                          />
                        </InputGroupContainer>

                        <FormTextArea name="notes" label="Note" __placeholder="Note" rows={5} />
                      </BoxContainer>
                    )}
                  </ContainerWithDivider>
                </Box>

                {memberId && (
                  <Box>
                    <MemberCard
                      memberDetails={{
                        name: memberDetailData?.name,
                        avatar: 'https://bit.ly/dan-abramov',
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
                      signaturePath={memberSignatureUrl}
                      citizenshipPath={memberCitizenshipUrl}
                      accountInfo={
                        sourceAccount
                          ? {
                              name: sourceAccount?.product?.productName,
                              type: sourceAccount?.product?.nature
                                ? accountTypes[sourceAccount?.product?.nature]
                                : '',
                              ID: sourceAccount?.product?.id,
                              currentBalance: sourceAccount?.balance ?? '0',
                              minimumBalance: sourceAccount?.product?.minimumBalance ?? '0',
                              guaranteeBalance: '1000',
                              overdrawnBalance: sourceAccount?.overDrawnBalance ?? '0',
                              fine: FINE,
                              // branch: 'Kumaripati',
                              openDate: sourceAccount?.accountOpenedDate ?? 'N/A',
                              expiryDate: sourceAccount?.accountExpiryDate ?? 'N/A',
                              lastTransactionDate: sourceAccount?.lastTransactionDate ?? 'N/A',
                            }
                          : null
                      }
                      viewProfileHandler={() => null}
                      viewAccountTransactionsHandler={() => null}
                    />

                    {destMemberId && (
                      <Box borderTop="1px" borderColor="border.layout">
                        <MemberCard
                          cardTitle="Receipent Member Info"
                          memberDetails={{
                            name: destMemberDetailData?.name,
                            avatar: 'https://bit.ly/dan-abramov',
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
                          showSignaturePreview={false}
                          citizenshipPath={destMemberCitizenshipUrl}
                          viewProfileHandler={() => null}
                          viewAccountTransactionsHandler={() => null}
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
              status={
                <Box display="flex" gap="s32">
                  <Text fontSize="r1" fontWeight={600} color="neutralColorLight.Gray-50">
                    Total Deposit Amount
                  </Text>
                  <Text fontSize="r1" fontWeight={600} color="neutralColorLight.Gray-70">
                    {totalDeposit ?? '---'}
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
