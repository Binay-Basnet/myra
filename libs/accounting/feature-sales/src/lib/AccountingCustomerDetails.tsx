import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useRouter } from 'next/router';
import { useQueryClient } from '@tanstack/react-query';
import pickBy from 'lodash/pickBy';

import { asyncToast } from '@myra-ui';

import {
  CustomerPayment,
  SalesCustomerPaymentInput,
  useGetNewIdMutation,
  useGetSalesCustomerPaymentFormStateDataQuery,
  useSetSalesCustomerPaymentDataMutation,
} from '@coop/cbs/data-access';
import { FormLayout } from '@coop/shared/form';
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
  const [newId, setNewId] = useState('');

  const getNewId = useGetNewIdMutation({});
  useEffect(() => {
    getNewId?.mutateAsync({}).then((res) => setNewId(res?.newId));
  }, []);

  const id = router?.query?.['id'] || newId;

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
    <FormLayout methods={methods}>
      <FormLayout.Header
        title={t['accountingCustomerPaymentAddNewCustomerPayment']}
        closeLink="/accounting/sales/customer-payment/list"
      />

      <FormLayout.Content>
        <FormLayout.Form>
          <CustomerDetails />

          <PaymentMode />

          <TDS />

          <PaymentTable />

          <CustomerPaymentBox />
        </FormLayout.Form>
      </FormLayout.Content>

      <FormLayout.Footer mainButtonLabel="Save" mainButtonHandler={handleSubmit} />
    </FormLayout>
  );
};
