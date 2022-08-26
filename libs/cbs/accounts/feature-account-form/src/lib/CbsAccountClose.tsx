/* eslint-disable-next-line */
import {
  Box,
  Container,
  FormHeader,
  FormMemberSelect,
  FormAccountSelect,
  DEFAULT_PAGE_SIZE,
  MemberCard,
  FormFooter,
  Divider,
  Text,
} from '@coop/shared/ui';
import { useTranslation } from '@coop/shared/utils';
import { FormRadioGroup } from '@coop/shared/form';

import React from 'react';
import {
  NatureOfDepositProduct,
  useGetAccountTableListQuery,
} from '@coop/cbs/data-access';
import { useForm, FormProvider } from 'react-hook-form';
import { useGetIndividualMemberDetails } from '@coop/shared/utils';
import { useMemo } from 'react';

export function CbsAccountClose() {
  const { t } = useTranslation();
  const methods = useForm();
  const { watch } = methods;
  const memberId = watch('memberId');
  const FINE = '0';
  const { memberDetailData, memberSignatureUrl, memberCitizenshipUrl } =
    useGetIndividualMemberDetails({ memberId });
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
  const accountTypes = {
    [NatureOfDepositProduct.Mandatory]: 'Mandatory Saving Account',
    [NatureOfDepositProduct.RecurringSaving]: 'Recurring Saving Account',
    [NatureOfDepositProduct.TermSavingOrFd]: 'Term Saving Account',
    [NatureOfDepositProduct.VoluntaryOrOptional]: 'Voluntary Saving Account',
  };
  const accountId = watch('accountId');
  const selectedAccount = useMemo(
    () =>
      accountListData?.account?.list?.edges?.find(
        (account) => account.node?.id === accountId
      )?.node,
    [accountId]
  );
  const radioList = [
    {
      label: 'Death',
      value: 'death',
    },
    {
      label: 'Migration',
      value: 'migration',
    },
    {
      label: 'Personal Reason',
      value: 'personalReason',
    },
    {
      label: 'Others',
      value: 'other',
    },
  ];
  const loanData = [
    {
      label: 'Loan',
      amount: '200',
    },
  ];

  return (
    <Container minW="container.xl" p="0" bg="white">
      <FormProvider {...methods}>
        <form>
          {' '}
          <Box
            position="sticky"
            top="110px"
            bg="gray.100"
            width="100%"
            zIndex="10"
          >
            <FormHeader title={t['accountClose']} />
          </Box>
          <Box display={'flex'} flexDirection="row" minH="calc(100vh - 230px)">
            {' '}
            <Box
              display="flex"
              flexDirection={'column'}
              gap="s16"
              p="s20"
              w="100%"
              borderRight={'1px solid'}
              borderColor="border.layout"
            >
              <FormMemberSelect name="memberId" label="Member" />
              {memberId && (
                <FormAccountSelect
                  name="accountId"
                  label="Select Deposit Account"
                  placeholder="Select Account"
                  options={accountListData?.account?.list?.edges?.map(
                    (account) => ({
                      accountInfo: {
                        accountName: account.node?.product.productName,
                        accountId: account.node?.id,
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
              )}
              <Box>
                {' '}
                <Divider />
                <Box display={'flex'} flexDirection="column" gap="s4" p="s16">
                  <Text fontSize="s3" fontWeight="600">
                    Reason for closing
                  </Text>
                  <FormRadioGroup
                    name="radioGroup"
                    options={radioList}
                    direction={'row'}
                  />
                </Box>
                <Divider />
                <Box display={'flex'} flexDirection="column" gap="s16">
                  <Box display="flex" flexDirection={'column'} gap="s4">
                    <Text fontSize={'r1'} fontWeight="600">
                      Fees & Charges Summary
                    </Text>
                    <Text fontSize={'s2'} fontWeight="400">
                      All charges and fees must be paid to get approved.
                    </Text>
                  </Box>
                </Box>
                <Box>
                  <Box
                    display="flex"
                    flexDirection={'column'}
                    gap="s16"
                    p="s16"
                  >
                    <Box display="flex" flexDirection={'column'} gap="s8">
                      <Text fontWeight={'600'} fontSize="s3">
                        Loan
                      </Text>
                      {loanData?.map(({ label, amount }) => {
                        return (
                          <Box
                            h="36px"
                            display={'flex'}
                            justifyContent="space-between"
                            alignItems={'center'}
                            key={`${label}${amount}`}
                          >
                            <Text fontWeight={'500'} fontSize="s3">
                              {label}
                            </Text>
                            <Text fontWeight={'600'} fontSize="r1">
                              {amount}
                            </Text>
                          </Box>
                        );
                      })}
                    </Box>
                  </Box>
                </Box>
              </Box>
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
                  showSignaturePreview={false}
                  citizenshipPath={memberCitizenshipUrl}
                  accountInfo={
                    selectedAccount
                      ? {
                          name: selectedAccount?.product?.productName,
                          type: selectedAccount?.product?.nature
                            ? accountTypes[selectedAccount?.product?.nature]
                            : '',
                          ID: selectedAccount?.product?.id,
                          currentBalance: selectedAccount?.balance ?? '0',
                          minimumBalance:
                            selectedAccount?.product?.minimumBalance ?? '0',
                          guaranteeBalance: '1000',
                          overdrawnBalance:
                            selectedAccount?.overDrawnBalance ?? '0',
                          fine: FINE,
                          // branch: 'Kumaripati',
                          openDate: selectedAccount?.accountOpenedDate ?? 'N/A',
                          expiryDate:
                            selectedAccount?.accountExpiryDate ?? 'N/A',
                          lastTransactionDate:
                            selectedAccount?.lastTransactionDate ?? 'N/A',
                        }
                      : null
                  }
                  viewProfileHandler={() => null}
                  viewAccountTransactionsHandler={() => null}
                />
              </Box>
            )}
          </Box>
          <Box position={'sticky'} bottom={0}>
            <FormFooter mainButtonLabel="Save" />
          </Box>
        </form>
      </FormProvider>
    </Container>
  );
}
