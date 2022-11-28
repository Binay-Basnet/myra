import { FormProvider, useForm } from 'react-hook-form';
import { BiSave } from 'react-icons/bi';
import { useRouter } from 'next/router';

import {
  ExternalLoanPaymentInput,
  ExternalLoanPaymentMethod,
  useExternalLoanListQuery,
  useSetExternalPaymentMutation,
} from '@coop/cbs/data-access';
import { FormInput, FormSelect, FormSwitchTab } from '@coop/shared/form';
import {
  Alert,
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
import { getRouterQuery, useTranslation } from '@coop/shared/utils';

export const ExternalLoanPaymentAdd = () => {
  const { t } = useTranslation();
  const router = useRouter();
  const methods = useForm<ExternalLoanPaymentInput>({
    defaultValues: {
      paymentMode: ExternalLoanPaymentMethod.Cash,
    },
  });
  // const id = String(router?.query?.['id']);

  const { getValues } = methods;

  const paymentModeList = [
    { label: t['cash'], value: ExternalLoanPaymentMethod.Cash },
    { label: t['bank'], value: ExternalLoanPaymentMethod.Bank },
    { label: t['other'], value: ExternalLoanPaymentMethod.Other },
  ];

  const { data } = useExternalLoanListQuery({
    pagination: getRouterQuery({ type: ['PAGINATION'] }),
  });

  const accountList = data?.accounting?.externalLoan?.loan?.list?.edges;

  const loanList =
    accountList &&
    accountList?.map((item) => ({
      label: item?.node?.loanName as string,
      value: item?.node?.id as string,
    }));

  const { mutateAsync } = useSetExternalPaymentMutation();

  const submitForm = () => {
    const values = getValues();

    asyncToast({
      id: 'external-loan-payment-id',
      msgs: {
        success: 'New External Loan Payment Added',
        loading: 'Adding External Loan Payment',
      },
      onSuccess: () => router.push('/accounting/loan/external-loan/list'),
      promise: mutateAsync({ data: values }),
      onError: (error) => {
        if (error.__typename === 'ValidationError') {
          Object.keys(error.validationErrorMsg).map((key) =>
            methods.setError(key as keyof ExternalLoanPaymentInput, {
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
        <FormHeader title="New External Loan Payment" />

        <FormProvider {...methods}>
          <form>
            <Box bg="white" minH="calc(100vh - 220px)">
              <FormSection>
                <GridItem colSpan={2}>
                  <FormSelect name="loanId" label="Select Loan" options={loanList ?? []} />
                </GridItem>
                <GridItem colSpan={1}>
                  <FormInput name="date" type="date" label="Date" />
                </GridItem>
                <GridItem colSpan={3}>
                  <Alert status="info" title="Loan Detail" hideCloseIcon>
                    <Box display="flex" gap="s4">
                      <Text fontSize="r1" fontWeight="Regular" color="neutralColorLight.Gray-80">
                        Principal:
                      </Text>
                      <Text fontSize="r1" fontWeight="SemiBold" color="neutralColorLight.Gray-80">
                        4,50,000.00
                      </Text>
                    </Box>
                    <Box display="flex" gap="s4">
                      <Text fontSize="r1" fontWeight="Regular" color="neutralColorLight.Gray-80">
                        Interest:
                      </Text>
                      <Text fontSize="r1" fontWeight="SemiBold" color="neutralColorLight.Gray-80">
                        9.04%
                      </Text>
                    </Box>
                  </Alert>
                </GridItem>
              </FormSection>

              <FormSection>
                <FormInput
                  name="installmentAmount"
                  label="Installment Amount"
                  type="number"
                  textAlign="right"
                />
                <FormInput name="rebate" label="Rebate" type="number" textAlign="right" />
                <FormInput name="fine" label="Fine" type="number" textAlign="right" />
                <FormInput
                  name="otherCharge"
                  label="Other Charges"
                  type="number"
                  textAlign="right"
                />
                <FormInput name="amountPaid" label="Amount Paid" type="number" textAlign="right" />

                <GridItem colSpan={3}>
                  <FormSwitchTab
                    label="Payment Mode"
                    name="paymentMode"
                    options={paymentModeList}
                  />
                </GridItem>
              </FormSection>
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
