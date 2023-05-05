import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useRouter } from 'next/router';
import { useQueryClient } from '@tanstack/react-query';
import pickBy from 'lodash/pickBy';

import { asyncToast } from '@myra-ui';

import {
  SalesCustomerInput,
  useGetNewIdMutation,
  useGetSalesCustomerFormStateDataQuery,
  useSetSalesCustomerDataMutation,
} from '@coop/cbs/data-access';
import { FormLayout } from '@coop/shared/form';

import { AdditionalDetail, CustomerDetail } from '../components/form-components/customer';

export const AddCustomer = () => {
  const router = useRouter();
  const [newId, setNewId] = useState('');

  const getNewId = useGetNewIdMutation({});
  useEffect(() => {
    getNewId?.mutateAsync({}).then((res) => setNewId(res?.newId));
  }, []);

  const id = router?.query?.['id'] || newId;

  const queryClient = useQueryClient();

  const methods = useForm<SalesCustomerInput>();

  const { getValues, reset } = methods;

  const [showAdditionalDetails, setShowAdditionalDetails] = useState<boolean>(false);

  const { data: formStateQueryData } = useGetSalesCustomerFormStateDataQuery(
    { id: String(id) },
    { enabled: Boolean(id && router?.asPath?.includes('edit')), staleTime: 0 }
  );

  const formState = formStateQueryData?.accounting?.sales?.customerFormState?.data;

  useEffect(() => {
    if (formState) {
      reset({
        ...pickBy(
          {
            ...formState,
            address: { ...formState.address, locality: formState.address?.locality?.local },
          } ?? {},
          (v) => v !== null
        ),
      });

      if (
        formState?.email ||
        formState?.creditTerms ||
        formState?.creditLimit ||
        formState?.openingBalance
      ) {
        setShowAdditionalDetails(true);
      }
    }
  }, [formState]);

  const { mutateAsync: setCustomerData } = useSetSalesCustomerDataMutation();

  const handleSubmit = () => {
    asyncToast({
      id: 'save-sales-customer-data',
      promise: setCustomerData({
        id: String(id),
        data: getValues(),
      }),
      msgs: {
        loading: 'Saving customer detail',
        success: 'Customer detail saved',
      },
      onSuccess: () => {
        queryClient.invalidateQueries(['getSalesCustomerListData']);
        router.push('/accounting/sales/customer/list');
      },
    });
  };

  return (
    <FormLayout methods={methods}>
      <FormLayout.Header title="New Customer" closeLink="/accounting/sales/customer/list" />

      <FormLayout.Content>
        <FormLayout.Form>
          <CustomerDetail setShowAdditionalDetails={setShowAdditionalDetails} />

          {showAdditionalDetails && <AdditionalDetail />}
        </FormLayout.Form>
      </FormLayout.Content>

      <FormLayout.Footer mainButtonLabel="Save" mainButtonHandler={handleSubmit} />
    </FormLayout>
  );
};
