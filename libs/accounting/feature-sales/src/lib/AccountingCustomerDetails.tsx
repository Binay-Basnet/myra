import { useEffect } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { useQueryClient } from '@tanstack/react-query';
import { useRouter } from 'next/router';
import pickBy from 'lodash/pickBy';

import {
  CustomerPayment,
  SalesCustomerPaymentInput,
  useGetSalesCustomerPaymentFormStateDataQuery,
  useSetSalesCustomerPaymentDataMutation,
} from '@coop/cbs/data-access';
import { asyncToast, Box, Container, FormFooter, FormHeader } from '@myra-ui';
import { useTranslation } from '@coop/shared/utils';

import {
  CustomerDetails,
  CustomerPaymentBox,
  PaymentMode,
  PaymentTable,
  TDS,
} from '../components/form-components/customerPaayment';

export const CustomerPaymentForm = () => {
  const { t } = useTranslation();

  const router = useRouter();

  const id = router?.query?.['id'];

  const queryClient = useQueryClient();

  const methods = useForm<SalesCustomerPaymentInput>({
    defaultValues: { paymentMethod: CustomerPayment.BankTransfer, tds: true },
  });

  const { getValues, reset } = methods;

  const { data: formStateQueryData } = useGetSalesCustomerPaymentFormStateDataQuery(
    { id: String(id) },
    { enabled: Boolean(id && router?.asPath?.includes('edit')), staleTime: 0 }
  );

  const formState = formStateQueryData?.accounting?.sales?.customerPaymentFormState?.data;

  useEffect(() => {
    if (router?.asPath?.includes('edit')) {
      if (formState) {
        reset({
          ...pickBy(
            {
              ...formState,
              paymentAllocation: formState?.paymentAllocation?.map((payment) => ({
                ...payment,
                date: payment.date.en || payment.date.np,
              })),
            } ?? {},
            (v) => v !== null
          ),
        });
      }
    }
  }, [formState]);

  const { mutateAsync: setCustomerPaymentData } = useSetSalesCustomerPaymentDataMutation();

  const handleSubmit = () => {
    const values = getValues();

    const filteredValues = {
      ...values,
      paymentAllocation: values.paymentAllocation.map((payment) => ({
        ...payment,
        date: { en: '', np: '', local: '' },
        amount: String(payment.amount),
        leftToAllocate: String(payment.leftToAllocate),
        thisAllocation: String(payment.thisAllocation),
      })),
    };

    asyncToast({
      id: 'save-sales-customer-payment',
      promise: setCustomerPaymentData({ id: String(id), data: filteredValues }),
      msgs: {
        loading: 'Saving customer payment',
        success: 'Customer payment saved',
      },
      onSuccess: () => {
        queryClient.invalidateQueries(['getSalesCustomerPaymentListData']);
        router.push('/accounting/sales/customer-payment/list');
      },
    });
  };

  return (
    <>
      <Container minW="container.xl" height="fit-content" pb="60px">
        <Box position="sticky" top="110px" bg="gray.100" width="100%" zIndex="10">
          <FormHeader
            title={t['accountingCustomerPaymentAddNewCustomerPayment']}
            closeLink="/accounting/sales/customer-payment/list"
          />
        </Box>

        <Box bg="white">
          <FormProvider {...methods}>
            <form>
              <Box minH="calc(100vh - 170px)">
                <CustomerDetails />

                <PaymentMode />

                <TDS />

                <PaymentTable />

                <CustomerPaymentBox />
              </Box>
            </form>
          </FormProvider>
        </Box>
      </Container>

      <Box position="relative" margin="0px auto">
        <Box bottom="0" position="fixed" width="100%" bg="gray.100" zIndex={10}>
          <Container minW="container.xl" height="fit-content">
            <FormFooter mainButtonLabel="Save" mainButtonHandler={handleSubmit} />
          </Container>
        </Box>
      </Box>
    </>
  );
};
