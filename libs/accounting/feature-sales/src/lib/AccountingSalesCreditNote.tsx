import { useEffect, useState } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { useRouter } from 'next/router';
import { useQueryClient } from '@tanstack/react-query';

import { asyncToast, Box, Container, FormFooter, FormHeader } from '@myra-ui';

import {
  SalesCreditNoteInput,
  SalesSaleEntryEntry,
  useGetNewIdMutation,
  useSetSalesCreditNoteDataMutation,
} from '@coop/cbs/data-access';
import { useTranslation } from '@coop/shared/utils';

import {
  CreditBox,
  CreditNoteDetails,
  ProductTable,
} from '../components/form-components/creditNote';

export const CreditNoteForm = () => {
  const { t } = useTranslation();
  const [newId, setNewId] = useState('');

  const [selectedSales, setSelectedSales] = useState<
    Partial<SalesSaleEntryEntry> | null | undefined
  >();

  const router = useRouter();

  const getNewId = useGetNewIdMutation({});

  useEffect(() => {
    getNewId?.mutateAsync({}).then((res) => setNewId(res?.newId));
  }, []);

  const id = router?.query?.['id'] || newId;

  const queryClient = useQueryClient();

  const methods = useForm<SalesCreditNoteInput>();

  const { getValues, reset, setValue } = methods;

  // const { data: formStateQueryData } = useGetSalesCreditNoteFormStateDataQuery(
  //   { id: String(id) },
  //   { enabled: Boolean(id && router?.asPath?.includes('edit')), staleTime: 0 }
  // );

  // const formState = formStateQueryData?.accounting?.sales?.creditNoteFormState?.data;

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

  const { mutateAsync: setCreditNoteData } = useSetSalesCreditNoteDataMutation();

  const handleSubmit = () => {
    const values = getValues();

    const filteredValues = {
      ...values,
      products: values?.products?.map((product) => ({
        ...product,
        quantity: String(product?.quantity),
        rate: String(product?.rate),
      })),
    };

    asyncToast({
      id: 'save-sales-credit-note',
      promise: setCreditNoteData({ data: filteredValues }),
      msgs: {
        loading: 'Saving credit note',
        success: 'Credit note saved',
      },
      onSuccess: () => {
        queryClient.invalidateQueries(['getSalesCreditNoteListData']);
        router.push('/accounting/sales/credit-note/list');
      },
    });
  };

  const getSelectedValue = (val: Partial<SalesSaleEntryEntry> | null | undefined) => {
    setSelectedSales(val);
  };

  useEffect(() => {
    setValue('products', selectedSales?.itemDetails ?? []);
  }, [selectedSales]);

  return (
    <>
      <Container minW="container.xl" height="fit-content" pb="60px">
        <Box position="sticky" top="0" bg="gray.100" width="100%" zIndex="10">
          <FormHeader
            title={t['accountingCreditNoteAddNewCreditNote']}
            closeLink="/accounting/sales/credit-note/list"
          />
        </Box>

        <Box bg="white">
          <FormProvider {...methods}>
            <form>
              <Box minH="calc(100vh - 170px)">
                <CreditNoteDetails getSelectedValue={getSelectedValue} />

                <ProductTable />

                <CreditBox />
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
