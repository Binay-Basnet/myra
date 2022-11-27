import { useEffect } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { useQueryClient } from '@tanstack/react-query';
import { useRouter } from 'next/router';
import pickBy from 'lodash/pickBy';

import {
  SalesSaleEntryInput,
  useGetSalesSaleEntryFormStateDataQuery,
  useSetSalesSaleEntryDataMutation,
} from '@coop/cbs/data-access';
import { asyncToast, Box, Container, FormFooter, FormHeader } from '@myra-ui';
import { useTranslation } from '@coop/shared/utils';

import { EntryTable, SalesBox, SalesDetails } from '../components/form-components/salesEntry';

export const NewSalesForm = () => {
  const { t } = useTranslation();

  const router = useRouter();

  const id = router?.query?.['id'];

  const queryClient = useQueryClient();

  const methods = useForm<SalesSaleEntryInput>();

  const { getValues, reset } = methods;

  const { data: formStateQueryData } = useGetSalesSaleEntryFormStateDataQuery(
    { id: String(id) },
    { enabled: Boolean(id && router?.asPath?.includes('edit')), staleTime: 0 }
  );

  const formState = formStateQueryData?.accounting?.sales?.saleEntryFormState?.data;

  useEffect(() => {
    if (router?.asPath?.includes('edit')) {
      if (formState) {
        reset({
          ...pickBy(
            {
              ...formState,
            } ?? {},
            (v) => v !== null
          ),
        });
      }
    }
  }, [formState]);

  const { mutateAsync: setSalesEntryData } = useSetSalesSaleEntryDataMutation();

  const handleSubmit = () => {
    const values = getValues();

    const filteredValues = {
      ...values,
      products: values.products.map((product) => ({
        ...product,
        quantity: String(product.quantity),
        rate: String(product.rate),
      })),
    };

    asyncToast({
      id: 'save-sales-sale-entry',
      promise: setSalesEntryData({ id: String(id), data: filteredValues }),
      msgs: {
        loading: 'Saving sales entry',
        success: 'Sales entry saved',
      },
      onSuccess: () => {
        queryClient.invalidateQueries(['getSalesSaleEntryListData']);
        router.push('/accounting/sales/list');
      },
    });
  };

  return (
    <>
      <Container minW="container.xl" height="fit-content" pb="60px">
        <Box position="sticky" top="110px" bg="gray.100" width="100%" zIndex="10">
          <FormHeader
            title={t['accountingSalesFormNewSalesEntry']}
            closeLink="/accounting/sales/list"
          />
        </Box>

        <Box bg="white">
          <FormProvider {...methods}>
            <form>
              <Box minH="calc(100vh - 170px)">
                <SalesDetails />

                <EntryTable />

                <SalesBox />
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
