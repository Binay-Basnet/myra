import { useEffect, useMemo, useState } from 'react';
import { FormProvider, useForm } from 'react-hook-form';

import { NatureOfDepositProduct } from '@coop/cbs/data-access';
import {
  FormCustomSelect,
  MemberSelect,
} from '@coop/cbs/transactions/ui-components';
import { FormInput } from '@coop/shared/form';
import {
  Box,
  Button,
  Container,
  Divider,
  FormFooter,
  FormHeader,
  Grid,
  MemberCard,
  Text,
} from '@coop/shared/ui';

import { InstallmentModel, Payment } from '../components';

/* eslint-disable-next-line */
export interface AddDepositProps {}

const accountTypes = {
  [NatureOfDepositProduct.Mandatory]: 'Mandatory Saving Account',
  [NatureOfDepositProduct.RecurringSaving]: 'Recurring Saving Account',
  [NatureOfDepositProduct.TermSavingOrFd]: 'Term Saving Account',
  [NatureOfDepositProduct.VoluntaryOrOptional]: 'Voluntary Saving Account',
};

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

export function AddDeposit() {
  // const { t } = useTranslation();

  const methods = useForm();

  const { watch, reset } = methods;

  // const { data } = useGetMemberIndividualDataQuery(
  //   {
  //     id: memberId,
  //   },
  //   {
  //     enabled: !!memberId,
  //   }
  // );

  // const memberData = data?.members?.details?.data;

  const memberId = watch('memberId');

  useEffect(() => {
    reset({ memberId, accountId: '', voucherId: '', amount: '' });
  }, [memberId]);

  const accountId = watch('accountId');

  const selectedAccount = useMemo(
    () => memberAccountsList.find((account) => account.accountId === accountId),
    [accountId]
  );

  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  const [mode, setMode] = useState<number>(0); // 0: form 1: payment

  const handleModalOpen = () => {
    setIsModalOpen(true);
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
  };

  const amountToBeDeposited = watch('amount') ?? 0;

  const totalDeposit = useMemo(
    () => (amountToBeDeposited ? Number(amountToBeDeposited) + 5000 - 1000 : 0),
    [amountToBeDeposited]
  );

  const handleSubmit = () => {
    // const values = getValues();
    // console.log({
    //   values,
    //   denominations: values?.['denomination']?.map(
    //     ({ amount, ...denomination }) => denomination
    //   ),
    // });
  };

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
            title={'New Deposit'}
            closeLink="/transactions/deposit/list"
            buttonLabel="Add Bulk Deposit"
            buttonHandler={() => null}
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
                  <MemberSelect
                    name="memberId"
                    label="Member"
                    placeholder="Select Member"
                  />

                  {memberId && (
                    <FormCustomSelect
                      name="accountId"
                      label="Select Deposit Account"
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

                  {accountId &&
                    (selectedAccount?.accountType ===
                      accountTypes[NatureOfDepositProduct.RecurringSaving] ||
                      selectedAccount?.accountType ===
                        accountTypes[NatureOfDepositProduct.Mandatory]) && (
                      <>
                        <Grid
                          templateColumns="repeat(2, 1fr)"
                          gap="s24"
                          alignItems="flex-end"
                        >
                          <FormInput name="voucherId" label="Voucher ID" />

                          <Box></Box>

                          <FormInput
                            name="noOfInstallments"
                            label="No of Installments"
                          />

                          <Box>
                            <Button variant="outline" onClick={handleModalOpen}>
                              View all installments
                            </Button>
                          </Box>
                        </Grid>

                        <Box display="flex" flexDirection="column" gap="s4">
                          <Text
                            fontSize="s3"
                            fontWeight={500}
                            color="neutralColorLight.Gray-70"
                          >
                            Payment Range
                          </Text>
                          <Text
                            fontSize="s3"
                            fontWeight={400}
                            color="neutralColorLight.Gray-70"
                          >
                            Payment made from Bhadra to Asoj
                          </Text>
                        </Box>
                      </>
                    )}

                  {accountId &&
                    selectedAccount?.accountType ===
                      accountTypes[NatureOfDepositProduct.TermSavingOrFd] && (
                      <>
                        <Grid
                          templateColumns="repeat(2, 1fr)"
                          gap="s24"
                          alignItems="flex-end"
                        >
                          <FormInput name="voucherId" label="Voucher ID" />

                          <FormInput
                            name="amount"
                            label="Amount to be Deposited"
                          />
                        </Grid>

                        <Box display="flex" flexDirection="column" gap="s4">
                          <Text
                            fontSize="s3"
                            fontWeight={500}
                            color="neutralColorLight.Gray-70"
                          >
                            Total amount in the account after deposit
                          </Text>
                          <Text
                            fontSize="s3"
                            fontWeight={400}
                            color="neutralColorLight.Gray-70"
                          >
                            Rs. 1,20,000.00
                          </Text>
                        </Box>
                      </>
                    )}

                  {accountId &&
                    selectedAccount?.accountType ===
                      accountTypes[
                        NatureOfDepositProduct.VoluntaryOrOptional
                      ] && (
                      <>
                        <Grid
                          templateColumns="repeat(2, 1fr)"
                          gap="s24"
                          alignItems="flex-end"
                        >
                          <FormInput name="voucherId" label="Voucher ID" />

                          <FormInput
                            name="amount"
                            label="Amount to be Deposited"
                          />
                        </Grid>

                        <Box display="flex" flexDirection="column" gap="s4">
                          <Text
                            fontSize="s3"
                            fontWeight={500}
                            color="neutralColorLight.Gray-70"
                          >
                            Total amount in the account after deposit
                          </Text>
                          <Text
                            fontSize="s3"
                            fontWeight={400}
                            color="neutralColorLight.Gray-70"
                          >
                            Rs. 1,20,000.00
                          </Text>
                        </Box>
                      </>
                    )}

                  {memberId && accountId && (
                    <>
                      <Divider
                        my="s8"
                        border="1px solid"
                        borderColor="background.500"
                      />

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
                            Deposit Amount
                          </Text>

                          <Text
                            fontSize="s3"
                            fontWeight={500}
                            color="neutralColorLight.Gray-80"
                          >
                            {amountToBeDeposited}
                          </Text>
                        </Box>

                        <Box display="flex" justifyContent="space-between">
                          <Text fontSize="s3" fontWeight={500} color="gray.600">
                            Fine
                          </Text>

                          <Text
                            fontSize="s3"
                            fontWeight={500}
                            color="danger.500"
                          >
                            + 5000
                          </Text>
                        </Box>

                        <Box display="flex" justifyContent="space-between">
                          <Text fontSize="s3" fontWeight={500} color="gray.600">
                            Rebate
                          </Text>

                          <Text
                            fontSize="s3"
                            fontWeight={500}
                            color="success.500"
                          >
                            - 1000
                          </Text>
                        </Box>

                        <Box display="flex" justifyContent="space-between">
                          <Text fontSize="s3" fontWeight={500} color="gray.600">
                            Total Deposit
                          </Text>

                          <Text
                            fontSize="s3"
                            fontWeight={500}
                            color="neutralColorLight.Gray-80"
                          >
                            {totalDeposit}
                          </Text>
                        </Box>
                      </Box>
                    </>
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
                      // signaturePath="/signature.jpg"
                      citizenshipPath="/citizenship.jpeg"
                      accountInfo={
                        selectedAccount
                          ? {
                              name: selectedAccount.accountName,
                              type: selectedAccount.accountType,
                              ID: selectedAccount.accountId,
                              currentBalance: '1,04,000.45',
                              minimumBalance: '1000',
                              guaranteeBalance: '1000',
                              overdrawnBalance: '0',
                              fine: '500',
                              branch: 'Kumaripati',
                              openDate: '2022-04-03',
                              expiryDate: '2022-04-03',
                              lastTransactionDate: '2022-04-03',
                            }
                          : null
                      }
                      viewProfileHandler={() => null}
                      viewAccountTransactionsHandler={() => null}
                    />
                  </Box>
                )}
              </Box>

              <Payment mode={mode} totalDeposit={Number(totalDeposit)} />
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
              mainButtonHandler={mode === 0 ? () => setMode(1) : handleSubmit}
            />
          </Container>
        </Box>
      </Box>

      <InstallmentModel isOpen={isModalOpen} onClose={handleModalClose} />
    </>
  );
}

export default AddDeposit;
