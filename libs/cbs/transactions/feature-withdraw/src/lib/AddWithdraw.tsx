import { useState } from 'react';
import { FormProvider, useForm } from 'react-hook-form';

import {
  Arrange,
  NatureOfDepositProduct,
  useGetMemberListQuery,
} from '@coop/cbs/data-access';
import { FormCustomSelect } from '@coop/cbs/transactions/ui-components';
import { InputGroupContainer } from '@coop/cbs/transactions/ui-containers';
import { FormInput, FormSelect, FormSwitchTab } from '@coop/shared/form';
import {
  Box,
  Button,
  Container,
  DEFAULT_PAGE_SIZE,
  FormFooter,
  FormHeader,
  MemberCard,
  Text,
} from '@coop/shared/ui';

import { Payment } from '../components';

/* eslint-disable-next-line */
export interface AddWithdrawProps {}

const accountTypes = {
  [NatureOfDepositProduct.Mandatory]: 'Mandatory Saving Account',
  [NatureOfDepositProduct.RecurringSaving]: 'Recurring Saving Account',
  [NatureOfDepositProduct.TermSavingOrFd]: 'Term Saving Account',
  [NatureOfDepositProduct.VoluntaryOrOptional]: 'Voluntary Saving Account',
};

const withdrawByTypes = [
  { label: 'Cheque', value: 'cheque' },
  { label: 'Withdraw Slip', value: 'withdrawSlip' },
];

const memberAccountsList = [
  {
    accountName: 'Kopila Karnadhar Saving',
    accountId: '100300010001324',
    accountType: accountTypes[NatureOfDepositProduct.Mandatory],
    balance: '1,30,000.43',
    fine: '40,000.32',
  },
  {
    accountName: 'Youth Saving',
    accountId: '100300010001325',
    accountType: accountTypes[NatureOfDepositProduct.VoluntaryOrOptional],
    balance: '1,30,000.43',
    fine: '40,000.32',
  },
  {
    accountName: 'Term Saving (Fixed Saving)',
    accountId: '100300010001326',
    accountType: accountTypes[NatureOfDepositProduct.TermSavingOrFd],
    balance: '1,30,000.43',
  },
  {
    accountName: 'Double Payment Saving Scheme',
    accountId: '100300010001327',
    accountType: accountTypes[NatureOfDepositProduct.RecurringSaving],
    balance: '1,30,000.43',
  },
];

export function AddWithdraw() {
  // const { t } = useTranslation();

  const methods = useForm();

  const { watch } = methods;

  const memberId = watch('memberId');

  // const { data } = useGetMemberIndividualDataQuery(
  //   {
  //     id: memberId,
  //   },
  //   {
  //     enabled: !!memberId,
  //   }
  // );

  // const memberData = data?.members?.details?.data;

  const { data: memberList } = useGetMemberListQuery(
    {
      first: Number(DEFAULT_PAGE_SIZE),
      after: '',
      column: 'ID',
      arrange: Arrange.Desc,
    },
    {
      staleTime: 0,
    }
  );

  const memberListData = memberList?.members?.list?.edges;

  const memberOptions =
    memberListData &&
    memberListData.map((member) => {
      return {
        label: `${member?.node?.id}-${member?.node?.name?.local}`,
        value: member?.node?.id,
      };
    });

  const accountId = watch('accountId');

  const [mode, setMode] = useState<number>(0); // 0: form 1: payment

  const withdrawBy = watch('withdrawBy');

  return (
    <>
      <Container minW="container.xl" height="fit-content">
        <Box
          position="sticky"
          top="110px"
          bg="gray.100"
          width="100%"
          zIndex="10"
        >
          <FormHeader
            title={'New Withdraw'}
            closeLink="/transactions/withdraw/list"
          />
        </Box>

        <Box bg="white" pb="100px">
          <FormProvider {...methods}>
            <form>
              <Box display={mode === 0 ? 'flex' : 'none'}>
                <Box
                  p="s16"
                  width="100%"
                  display="flex"
                  flexDirection="column"
                  gap="s24"
                  borderRight="1px"
                  borderColor="border.layout"
                >
                  <FormSelect
                    name="memberId"
                    label="Member"
                    placeholder="Select Member"
                    options={memberOptions}
                  />

                  {memberId && (
                    <FormCustomSelect
                      name="accountId"
                      label="Select Withdraw Account"
                      placeholder="Select Account"
                      options={memberAccountsList.map((account) => ({
                        accountInfo: {
                          accountName: account.accountName,
                          accountId: account.accountId,
                          accountType: account.accountType,
                          balance: account.balance,
                          fine: account.fine,
                        },
                        value: account.accountId,
                      }))}
                    />
                  )}

                  {memberId && accountId && (
                    <FormSwitchTab
                      name="withdrawBy"
                      label="Withdraw By"
                      options={withdrawByTypes}
                    />
                  )}

                  {memberId && accountId && withdrawBy === 'cheque' && (
                    <>
                      <InputGroupContainer>
                        <FormSelect
                          name="chequeNo"
                          label="Cheque No"
                          placeholder="Select Cheque"
                        />
                      </InputGroupContainer>

                      <FormInput
                        type="number"
                        min={0}
                        name="withdrawAmount"
                        label="Withdraw Amount"
                        textAlign="right"
                        placeholder="0.0"
                      />
                    </>
                  )}

                  {memberId && accountId && (
                    <Box
                      bg="background.500"
                      borderRadius="br2"
                      px="s16"
                      py="s18"
                      display="flex"
                      flexDirection="column"
                      gap="s14"
                    >
                      <Box display="flex" justifyContent="space-between">
                        <Text fontSize="s3" fontWeight={500} color="gray.600">
                          Withdraw Amount
                        </Text>

                        <Text
                          fontSize="s3"
                          fontWeight={500}
                          color="neutralColorLight.Gray-80"
                        >
                          20,000
                        </Text>
                      </Box>

                      <Box display="flex" justifyContent="space-between">
                        <Text fontSize="s3" fontWeight={500} color="gray.600">
                          Fine
                        </Text>

                        <Text fontSize="s3" fontWeight={500} color="danger.500">
                          - 5000
                        </Text>
                      </Box>

                      <Box display="flex" justifyContent="space-between">
                        <Text fontSize="s3" fontWeight={500} color="gray.600">
                          Total Withdraw
                        </Text>

                        <Text
                          fontSize="s3"
                          fontWeight={500}
                          color="neutralColorLight.Gray-80"
                        >
                          15,000
                        </Text>
                      </Box>
                    </Box>
                  )}
                </Box>

                {memberId && (
                  <Box>
                    <MemberCard
                      memberDetails={{
                        name: 'Ram Kumar Pandey',
                        avatar: 'https://bit.ly/dan-abramov',
                        memberID: '23524364456',
                        gender: 'Male',
                        age: '43',
                        maritalStatus: 'Unmarried',
                        dateJoined: '2077/04/03',
                        branch: 'Basantapur',
                        phoneNo: '9841045567',
                        email: 'ajitkumar.345@gmail.com',
                        address: 'Basantapur',
                      }}
                      notice="KYM needs to be updated"
                      signaturePath="/signature.jpg"
                      citizenshipPath="/citizenship.jpeg"
                      accountInfo={{
                        name: 'Kopila Karnadhar Saving',
                        type: 'Mandatory Saving',
                        ID: '100300010001324',
                        currentBalance: '1,04,000.45',
                        minimumBalance: '1000',
                        guaranteeBalance: '1000',
                        overdrawnBalance: '0',
                        fine: '500',
                        branch: 'Kumaripati',
                        openDate: '2022-04-03',
                        expiryDate: '2022-04-03',
                        lastTransactionDate: '2022-04-03',
                      }}
                      viewProfileHandler={() => null}
                      viewAccountTransactionsHandler={() => null}
                    />
                  </Box>
                )}
              </Box>

              <Payment mode={mode} />
            </form>
          </FormProvider>
        </Box>
      </Container>

      <Box position="relative" margin="0px auto">
        <Box bottom="0" position="fixed" width="100%" bg="gray.100" zIndex={10}>
          <Container minW="container.xl" height="fit-content">
            <FormFooter
              status={
                mode === 0 ? (
                  <Box display="flex" gap="s32">
                    <Text
                      fontSize="r1"
                      fontWeight={600}
                      color="neutralColorLight.Gray-50"
                    >
                      {'Total Deposit Amount'}
                    </Text>
                    <Text
                      fontSize="r1"
                      fontWeight={600}
                      color="neutralColorLight.Gray-70"
                    >
                      {'---'}
                    </Text>
                  </Box>
                ) : (
                  <Button variant="solid" onClick={() => setMode(0)}>
                    Previous
                  </Button>
                )
              }
              mainButtonLabel={mode === 0 ? 'Proceed to Payment' : 'Submit'}
              mainButtonHandler={mode === 0 ? () => setMode(1) : () => null}
            />
          </Container>
        </Box>
      </Box>
    </>
  );
}

export default AddWithdraw;
