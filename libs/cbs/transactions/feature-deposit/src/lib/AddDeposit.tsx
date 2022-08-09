import { useMemo, useState } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { BiRightArrowAlt } from 'react-icons/bi';
import {
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
} from '@chakra-ui/react';

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
  Divider,
  FormFooter,
  FormHeader,
  Grid,
  GridItem,
  Icon,
  MemberCard,
  Text,
} from '@coop/shared/ui';
import { useTranslation } from '@coop/shared/utils';

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

const installmentsList = [
  {
    from: '01-05-2079',
    to: '01-06-2079',
    status: 'Done',
    title: 'Bhadra',
  },
  {
    from: '01-06-2079',
    to: '01-07-2079',
    status: 'Forgive',
    title: 'Asoj',
  },
  {
    from: '01-07-2079',
    to: '01-08-2079',
    status: 'Forgive',
    title: 'Kartik',
  },
];

const paymentModes = [
  {
    label: 'Cash',
    value: 'cash',
  },
  {
    label: 'Cheque',
    value: 'cheque',
  },
  {
    label: 'Bank Voucher',
    value: 'bankVoucher',
  },
];

export function AddDeposit() {
  const { t } = useTranslation();

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

  const selectedAccountType = useMemo(
    () =>
      memberAccountsList.find((account) => account.accountId === accountId)
        ?.accountType,
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

  const selectedPaymentMode = watch('paymentMode');

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
            closeLink="/transactions/add"
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
                  <FormSelect
                    name="memberId"
                    label="Member"
                    placeholder="Select Member"
                    options={memberOptions}
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
                    (selectedAccountType ===
                      accountTypes[NatureOfDepositProduct.RecurringSaving] ||
                      selectedAccountType ===
                        accountTypes[NatureOfDepositProduct.Mandatory]) && (
                      <>
                        <Grid
                          templateColumns="repeat(2, 1fr)"
                          gap="s24"
                          alignItems="flex-end"
                        >
                          <FormInput name="voucherID" label="Voucher ID" />

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
                    selectedAccountType ===
                      accountTypes[NatureOfDepositProduct.TermSavingOrFd] && (
                      <>
                        <Grid
                          templateColumns="repeat(2, 1fr)"
                          gap="s24"
                          alignItems="flex-end"
                        >
                          <FormInput name="voucherID" label="Voucher ID" />

                          <FormInput
                            name="amountToBeDeposited"
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
                    selectedAccountType ===
                      accountTypes[
                        NatureOfDepositProduct.VoluntaryOrOptional
                      ] && (
                      <>
                        <Grid
                          templateColumns="repeat(2, 1fr)"
                          gap="s24"
                          alignItems="flex-end"
                        >
                          <FormInput name="voucherID" label="Voucher ID" />

                          <FormInput
                            name="amountToBeDeposited"
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
                            20,000
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
                            24,000
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

              <Box
                display={mode === 1 ? 'flex' : 'none'}
                p="s16"
                width="100%"
                flexDirection="column"
                gap="s24"
                borderRight="1px"
                borderColor="border.layout"
              >
                <FormSwitchTab
                  label={'Payment Mode'}
                  options={paymentModes}
                  name="paymentMode"
                />

                {selectedPaymentMode === 'bankVoucher' && (
                  <InputGroupContainer>
                    <GridItem colSpan={2}>
                      <FormInput
                        name="bankName"
                        label="Bank Name"
                        placeholder="Bank Name"
                      />
                    </GridItem>

                    <GridItem>
                      <FormInput
                        name="bankVoucherID"
                        label="Voucher ID"
                        placeholder="Voucher ID"
                      />
                    </GridItem>
                  </InputGroupContainer>
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
                  <Text
                    fontSize="r1"
                    fontWeight={600}
                    color="neutralColorLight.Gray-50"
                  >
                    {t['formDetails']}
                  </Text>
                  <Text
                    fontSize="r1"
                    fontWeight={600}
                    color="neutralColorLight.Gray-70"
                  >
                    {'---'}
                  </Text>
                </Box>
              }
              mainButtonLabel={mode === 0 ? 'Proceed to Payment' : 'Submit'}
              mainButtonHandler={mode === 0 ? () => setMode(1) : () => null}
            />
          </Container>
        </Box>
      </Box>

      <Modal isOpen={isModalOpen} onClose={handleModalClose} isCentered={true}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>
            <Text
              fontSize="r2"
              color="neutralColorLight.Gray-80"
              fontWeight="SemiBold"
            >
              Installments
            </Text>
          </ModalHeader>
          <Divider />

          <ModalCloseButton />
          <ModalBody
            // display="flex"
            // justifyContent="center"
            // alignItems="center"
            p="s16"
          >
            <Box
              border="1px"
              borderColor="border.layout"
              borderRadius="br2"
              px="s12"
              py="s8"
              display="flex"
              flexDirection="column"
              gap="s16"
            >
              {installmentsList.map((installment) => (
                <Box
                  display="flex"
                  justifyContent="space-between"
                  alignItems="center"
                >
                  <Box display="flex" flexDirection="column">
                    <Text
                      fontSize="r1"
                      fontWeight={500}
                      color="neutralColorLight.Gray-80"
                    >
                      {installment.title}
                    </Text>
                    <Box display="flex" alignItems="center">
                      <Text
                        fontSize="s3"
                        fontWeight={400}
                        color="neutralColorLight.Gray-60"
                      >
                        {installment.from}
                      </Text>
                      <Icon
                        as={BiRightArrowAlt}
                        w="s16"
                        cursor="pointer"
                        color="neutralColorLight.Gray-60"
                        h="s16"
                      />
                      <Text
                        fontSize="s3"
                        fontWeight={400}
                        color="neutralColorLight.Gray-60"
                      >
                        {installment.to}
                      </Text>
                    </Box>
                  </Box>

                  <Box>
                    <Text
                      fontSize="r1"
                      fontWeight={500}
                      color={
                        installment.status === 'Done'
                          ? 'neutralColorLight.Gray-60'
                          : 'primary.500'
                      }
                    >
                      {installment.status}
                    </Text>
                  </Box>
                </Box>
              ))}
            </Box>
          </ModalBody>

          <Divider />
          <ModalFooter>
            <Button variant="solid" onClick={handleModalClose}>
              Save
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}

export default AddDeposit;
