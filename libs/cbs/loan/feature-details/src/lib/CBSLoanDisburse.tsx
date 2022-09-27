import { Dispatch, SetStateAction, useState } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { IoChevronBackOutline } from 'react-icons/io5';
import { useRouter } from 'next/router';
import { Box } from '@chakra-ui/react';
import { omit } from 'lodash';

import {
  LoanDisbursementInput,
  LoanDisbursementMethod,
  useGetBankListQuery,
  useSetDisburseLoanMutation,
} from '@coop/cbs/data-access';
import { LoanListLayout } from '@coop/cbs/loan/layouts';
import { FormInput, FormSelect, FormSwitchTab, FormTextArea } from '@coop/shared/form';
import {
  asyncToast,
  Button,
  Container,
  Divider,
  FormAccountSelect,
  FormFooter,
  FormHeader,
  Grid,
  GridItem,
  MemberCard,
  Text,
} from '@coop/shared/ui';
import { useGetIndividualMemberDetails } from '@coop/shared/utils';

import CBSLoanDetails from './CbsLoanFeatureDetails';
import { LoanDetailsHeader, LoanProductCard } from '../components';
import { useLoanDetails } from '../hooks/useLoanDetails';

const paymentModes = [
  {
    label: 'Account Transfer',
    value: LoanDisbursementMethod?.Account,
  },
  {
    label: 'Bank Cheque',
    value: LoanDisbursementMethod?.BankCheque,
  },
];

export const CBSLoanDisburse = () => {
  const { loan } = useLoanDetails();
  const [mode, setMode] = useState<'details' | 'payment'>('details');

  const continueToPayment = () => {
    setMode('payment');
  };

  return (
    <Box>
      {mode === 'details' ? (
        <LoanListLayout>
          <LoanDetailsHeader title="Loan Application List" />
          <CBSLoanDetails />
          <Box position="fixed" bottom="0" w="calc(100% - 260px)">
            <FormFooter
              mainButtonLabel="Disburse Loan"
              mainButtonHandler={continueToPayment}
              status={`Total Sanctioned Amount: ${loan?.totalSanctionedAmount}`}
            />
          </Box>
        </LoanListLayout>
      ) : (
        <CBSLoanDisbursePayment setMode={setMode} />
      )}
    </Box>
  );
};
interface IProps {
  setMode: Dispatch<SetStateAction<'details' | 'payment'>>;
}
export const CBSLoanDisbursePayment = ({ setMode }: IProps) => {
  const router = useRouter();
  const methods = useForm<LoanDisbursementInput>();
  const { watch, getValues } = methods;

  const selectedPaymentMode = watch('method');
  const { mutateAsync } = useSetDisburseLoanMutation();
  const id = String(router?.query?.['id']);

  const disburseLoan = () => {
    // TODO! CALL API HEREi

    const values = getValues();
    let filteredValues = {
      ...values,
    };
    if (values.method === LoanDisbursementMethod?.Account) {
      filteredValues = omit({ ...filteredValues }, ['bankChequePayment']);
    }

    if (values.method === LoanDisbursementMethod?.BankCheque) {
      filteredValues = omit({ ...filteredValues }, ['accountPayment']);
    }
    asyncToast({
      id: 'loan-account-disperse-id',
      msgs: {
        success: 'Loan has been Dispersed',
        loading: 'Dispercing Loan',
      },
      onSuccess: () => router.push('/loan/accounts'),
      promise: mutateAsync({
        loanAccountId: id,
        data: {
          ...(filteredValues as LoanDisbursementInput),
        },
      }),
    });
    // setMode('details');
  };

  const previousButtonHandler = () => {
    setMode('details');
  };
  const { data: bankList } = useGetBankListQuery();

  const { loan } = useLoanDetails();
  const memberId = loan?.memberId as string;
  const { memberDetailData, memberSignatureUrl, memberCitizenshipUrl } =
    useGetIndividualMemberDetails({ memberId });

  const productId = loan?.productId as string;

  return (
    <Container minW="container.xl" p="0" bg="white">
      <Box position="sticky" top="110px" bg="gray.100" width="100%" zIndex="10">
        <FormHeader title="Loan Application" />
      </Box>
      <Box display="flex" flexDirection="row" minH="calc(100vh - 220px)">
        <Box
          display="flex"
          flexDirection="column"
          w="100%"
          borderRight="1px solid"
          borderColor="border.layout"
          p="s16"
        >
          <FormProvider {...methods}>
            <form>
              <FormSwitchTab label="Disbursement Method" options={paymentModes} name="method" />

              {selectedPaymentMode === LoanDisbursementMethod?.Account && (
                <Grid templateColumns="repeat(2,1fr)" gap="s20" pt="s16">
                  <GridItem colSpan={2}>
                    <FormAccountSelect
                      name="accountPayment.destinationAccount"
                      label="Destination Account"
                      memberId={memberId}
                    />
                  </GridItem>
                  <FormInput
                    name="amount"
                    type="number"
                    label="Amount"
                    textAlign="right"
                    placeholder="0.00"
                  />
                  <Divider />
                  <GridItem colSpan={2} display="flex" flexDirection="column" gap="s4">
                    {' '}
                    <FormTextArea name="accountPayment.note" label="Note" />
                  </GridItem>
                </Grid>
              )}

              {selectedPaymentMode === LoanDisbursementMethod?.BankCheque && (
                <Grid templateColumns="repeat(2,1fr)" gap="s20" pt="s16">
                  {' '}
                  <GridItem colSpan={2}>
                    <FormSelect
                      name="bankChequePayment.bankAccountId"
                      label="Bank Name"
                      options={
                        bankList?.bank?.bank?.list?.map((bank) => ({
                          label: bank?.name as string,
                          value: bank?.id as string,
                        })) ?? []
                      }
                    />
                  </GridItem>
                  <FormInput
                    name="bankChequePayment.chequeNo"
                    label="Cheque No"
                    placeholder="Cheque No"
                  />
                  <FormInput
                    name="amount"
                    type="number"
                    label="Amount"
                    textAlign="right"
                    placeholder="0.00"
                  />
                  <GridItem colSpan={2} display="flex" flexDirection="column" gap="s4">
                    <FormTextArea name="bankChequePayment.note" label="Note" />
                  </GridItem>
                </Grid>
              )}
            </form>
          </FormProvider>
        </Box>

        <Box>
          <Box position="sticky" top="170px" right="0" w="320px" overflowX="hidden">
            <Box display="flex" flexDirection="column" gap="s16">
              <MemberCard
                memberDetails={{
                  name: memberDetailData?.name,
                  avatar: memberDetailData?.profilePicUrl ?? '',
                  memberID: memberDetailData?.id,
                  gender: memberDetailData?.gender,
                  age: memberDetailData?.age,
                  maritalStatus: memberDetailData?.maritalStatus,
                  dateJoined: memberDetailData?.dateJoined,
                  phoneNo: memberDetailData?.contact,
                  email: memberDetailData?.email,
                  address: memberDetailData?.address,
                }}
                signaturePath={memberSignatureUrl}
                showSignaturePreview={false}
                citizenshipPath={memberCitizenshipUrl}
                viewProfileHandler={() => null}
                viewAccountTransactionsHandler={() => null}
              />
              <Box p="s16" display="flex" flexDirection="column" gap="s16">
                <LoanProductCard productId={productId} />
                <Box border="1px solid" borderColor="border.layout" borderRadius="br2">
                  <Box p="s8" display="flex" flexDirection="column" gap="s8">
                    <Box display="flex" flexDirection="row" justifyContent="space-between">
                      <Text fontSize="s3" fontWeight="400">
                        Applied Loan Amount
                      </Text>
                      <Text fontSize="s2" fontWeight="600">
                        {loan?.appliedLoanAmount}{' '}
                      </Text>
                    </Box>
                    <Box display="flex" flexDirection="row" justifyContent="space-between">
                      <Text fontSize="s3" fontWeight="400">
                        Form Charge{' '}
                      </Text>
                      <Text fontSize="s2" fontWeight="600" color="danger.500">
                        100{' '}
                      </Text>
                    </Box>
                    <Box display="flex" flexDirection="row" justifyContent="space-between">
                      <Text fontSize="s3" fontWeight="400">
                        Application Processing Fees{' '}
                      </Text>
                      <Text fontSize="s2" fontWeight="600" color="danger.500">
                        100{' '}
                      </Text>
                    </Box>
                    <Box display="flex" flexDirection="row" justifyContent="space-between">
                      <Text fontSize="s3" fontWeight="400">
                        Supporting Fees{' '}
                      </Text>
                      <Text fontSize="s2" fontWeight="600" color="danger.500">
                        100{' '}
                      </Text>
                    </Box>
                  </Box>
                  <Box display="flex" justifyContent="space-between" p="s8" bg="border.layout">
                    <Text fontSize="s3" fontWeight="400">
                      Total Disbursed Amount{' '}
                    </Text>
                    <Text fontSize="s2" fontWeight="600">
                      99700
                    </Text>
                  </Box>
                </Box>
              </Box>
            </Box>
          </Box>
        </Box>
      </Box>
      <Box position="sticky" bottom="0">
        <FormFooter
          mainButtonLabel="Disburse Loan"
          mainButtonHandler={disburseLoan}
          status={
            <Button
              onClick={previousButtonHandler}
              variant="outline"
              leftIcon={<IoChevronBackOutline />}
            >
              {' '}
              Previous
            </Button>
          }
        />
      </Box>
    </Container>
  );
};
