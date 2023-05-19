import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useRouter } from 'next/router';
import { useQueryClient } from '@tanstack/react-query';

import { asyncToast } from '@myra-ui';

import {
  SalesSaleEntryInput,
  useGetInventoryItemsListQuery,
  useGetNewIdMutation,
  useSetSalesSaleEntryDataMutation,
} from '@coop/cbs/data-access';
import { ROUTES } from '@coop/cbs/utils';
import { FormLayout } from '@coop/shared/form';
import { useTranslation } from '@coop/shared/utils';

import { EntryTable, SalesBox, SalesDetails } from '../components/form-components/salesEntry';

export const NewSalesForm = () => {
  const { t } = useTranslation();
  const [newId, setNewId] = useState('');

  const router = useRouter();

  const getNewId = useGetNewIdMutation({});
  useEffect(() => {
    getNewId?.mutateAsync({}).then((res) => setNewId(res?.newId));
  }, []);

  const id = router?.query?.['id'] || newId;

  const queryClient = useQueryClient();

  const methods = useForm<SalesSaleEntryInput>();

  const { getValues } = methods;

  // const { data: formStateQueryData } = useGetSalesSaleEntryFormStateDataQuery(
  //   { id: String(id) },
  //   { enabled: Boolean(id && router?.asPath?.includes('edit')), staleTime: 0 }
  // );

  // const formState = formStateQueryData?.accounting?.sales?.saleEntryFormState?.data;

  // useEffect(() => {
  //   if (router?.asPath?.includes('edit')) {
  //     if (formState) {
  //       reset({
  //         ...pickBy(
  //           {
  //             ...formState,
  //           } ?? {},
  //           (v) => v !== null
  //         ),
  //       });
  //     }
  //   }
  // }, [formState]);

  const { mutateAsync: setSalesEntryData } = useSetSalesSaleEntryDataMutation();

  const { data: inventoryItems } = useGetInventoryItemsListQuery({
    pagination: {
      after: '',
      first: -1,
    },
  });
  const inventoryItemsData = inventoryItems?.inventory?.items?.list?.edges;

  const handleSubmit = () => {
    const values = getValues();

    const filteredValues = {
      ...values,
      products: values?.products?.map((product) => ({
        ...product,
        tax: inventoryItemsData?.find((item) => item?.node?.id === product?.itemId)?.node?.taxId,
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
        router.push(ROUTES.ACCOUNTING_SALES_ENTRY);
      },
    });
  };

  return (
    <FormLayout methods={methods}>
      <FormLayout.Header
        title={t['accountingSalesFormNewSalesEntry']}
        closeLink="/accounting/sales/sales-entry/list"
      />

      <FormLayout.Content>
        <FormLayout.Form>
          <SalesDetails />

          <EntryTable />

          <SalesBox />
        </FormLayout.Form>
      </FormLayout.Content>

      <FormLayout.Footer mainButtonLabel="Save" mainButtonHandler={handleSubmit} />
    </FormLayout>
  );
};
