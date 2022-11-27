import { FormProvider, useForm } from 'react-hook-form';
import { BiSave } from 'react-icons/bi';
import { useRouter } from 'next/router';

import {
  ExternalLoanApplicationInput,
  ExternalLoanPaymentMethod,
  FrequencyTenure,
  InstallmentFrequency,
  LoanRepaymentScheme,
  useSetExternalLoanMutation,
} from '@coop/cbs/data-access';
import { FormSwitchTab } from '@coop/shared/form';
import {
  asyncToast,
  Box,
  Button,
  Container,
  FormFooter,
  FormHeader,
  FormSection,
  GridItem,
  Icon,
  Text,
} from '@myra-ui';
import { useTranslation } from '@coop/shared/utils';

import {
  Collateral,
  Documents,
  ExternalLoanInfo,
  Installment,
  Insurance,
  LoanProcessTable,
  LoanTenure,
} from '../component';

/* eslint-disable-next-line */
export interface ExternalLoanAddProps {}

export const ExternalLoanAdd = () => {
  const { t } = useTranslation();
  const router = useRouter();
  const methods = useForm<ExternalLoanApplicationInput>({
    defaultValues: {
      tenureUnit: FrequencyTenure.Day,
      insurance: false,
      installmentType: LoanRepaymentScheme.Emi,
      installmentFrequency: InstallmentFrequency.Daily,
      paymentMethod: ExternalLoanPaymentMethod.Cash,
    },
  });
  // const id = String(router?.query?.['id']);
  const { getValues, watch } = methods;

  const insurance = watch('insurance');

  const { mutateAsync } = useSetExternalLoanMutation();

  const paymentModeList = [
    { label: t['cash'], value: ExternalLoanPaymentMethod.Cash },
    { label: t['bank'], value: ExternalLoanPaymentMethod.Bank },
  ];

  const submitForm = () => {
    const values = getValues();

    const updatedData = {
      ...values,
      insuranceCompany: insurance ? values?.insuranceCompany : null,
      insurancePremiumAmount: insurance ? values?.insurancePremiumAmount : null,
      insuranceStartDate: insurance ? values?.insuranceStartDate : null,
      insuranceValidUpto: insurance ? values?.insuranceValidUpto : null,
    };

    asyncToast({
      id: 'external-loan-id',
      msgs: {
        success: 'New External Loan Added',
        loading: 'Adding External Loan',
      },
      onSuccess: () => router.push('/accounting/loan/external-loan/list'),
      promise: mutateAsync({ data: updatedData }),
      onError: (error) => {
        if (error.__typename === 'ValidationError') {
          Object.keys(error.validationErrorMsg).map((key) =>
            methods.setError(key as keyof ExternalLoanApplicationInput, {
              message: error.validationErrorMsg[key][0] as string,
            })
          );
        }
      },
    });
  };

  return (
    <>
      <Container minW="container.lg" height="fit-content" pb="60px">
        <FormHeader title="New External Loan" />

        <FormProvider {...methods}>
          <form>
            <Box bg="white" minH="calc(100vh - 220px)">
              <ExternalLoanInfo />

              <LoanTenure />

              <Installment />

              <Collateral />

              <FormSection>
                <GridItem colSpan={3}>
                  <LoanProcessTable />
                </GridItem>
              </FormSection>

              <Insurance />

              <FormSection>
                <FormSwitchTab
                  name="paymentMethod"
                  label="Payment Method"
                  defaultValue="cash"
                  options={paymentModeList}
                />
              </FormSection>
              <Documents />
            </Box>
          </form>
        </FormProvider>
      </Container>
      <Box bottom="0" position="fixed" width="100%" bg="gray.100">
        <Container minW="container.lg" height="fit-content">
          <FormFooter
            status={
              <Box display="flex" gap="s8">
                <Text as="i" fontSize="r1">
                  {t['formDetails']}
                </Text>
              </Box>
            }
            draftButton={
              <Button type="submit" variant="ghost" shade="neutral">
                <Icon as={BiSave} />
                <Text alignSelf="center" fontWeight="Medium" fontSize="s2" ml="5px">
                  {t['saveDraft']}
                </Text>
              </Button>
            }
            mainButtonLabel={t['save']}
            mainButtonHandler={submitForm}
          />
        </Container>
      </Box>
    </>
  );
};

export default ExternalLoanAdd;
