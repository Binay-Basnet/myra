import { useEffect, useState } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { useQueryClient } from 'react-query';
import { useRouter } from 'next/router';
import pickBy from 'lodash/pickBy';

import {
  SalesCustomerInput,
  useGetSalesCustomerFormStateDataQuery,
  useSetSalesCustomerDataMutation,
} from '@coop/cbs/data-access';
import { asyncToast, Box, Container, FormFooter, FormHeader } from '@coop/shared/ui';

import { AdditionalDetail, CustomerDetail } from '../components/form-components/customer';

export const AddCustomer = () => {
  const router = useRouter();

  const id = router?.query?.['id'];

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
        queryClient.invalidateQueries('getSalesCustomerListData');
        router.push('/accounting/sales/customer/list');
      },
    });
  };

  return (
    <>
      <Container minW="container.xl" height="fit-content" pb="60px">
        <Box position="sticky" top="110px" bg="gray.100" width="100%" zIndex="10">
          <FormHeader title="New Customer" closeLink="/accounting/sales/customer/list" />
        </Box>

        <Box bg="white">
          <FormProvider {...methods}>
            <form>
              <Box minH="calc(100vh - 170px)">
                <CustomerDetail setShowAdditionalDetails={setShowAdditionalDetails} />

                {showAdditionalDetails && <AdditionalDetail />}
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
