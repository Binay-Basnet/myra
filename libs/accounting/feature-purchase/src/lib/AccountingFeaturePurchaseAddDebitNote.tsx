import { useEffect, useState } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { useRouter } from 'next/router';
import { useQueryClient } from '@tanstack/react-query';

import { asyncToast, Box, Container, FormFooter, FormHeader } from '@myra-ui';

import {
  PurchaseDebitNoteInput,
  SalesSaleEntryEntry,
  useAddNewDebitNoteMutation,
  useGetNewIdMutation,
} from '@coop/cbs/data-access';
import { useTranslation } from '@coop/shared/utils';

import { DebitBox } from '../components/debit-note/DebitBox';
import { DebitNoteDetails } from '../components/debit-note/DebitNoteDetails';
import { DebitProductTable } from '../components/debit-note/DebitProductTable';

export const AccountingFeaturePurchaseAddDebitNote = () => {
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

  // const id = router?.query?.['id'] || newId;

  const queryClient = useQueryClient();

  const methods = useForm<PurchaseDebitNoteInput>();

  const { getValues, setValue } = methods;

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

  const { mutateAsync: setCreditNoteData } = useAddNewDebitNoteMutation();

  const handleSubmit = () => {
    const values = getValues();

    const filteredValues = {
      ...values,
      itemDetails: values?.itemDetails?.map((product) => ({
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
    setValue('itemDetails', selectedSales?.itemDetails ?? []);
  }, [selectedSales]);

  return (
    <Container minW="container.xl" height="fit-content">
      <Box position="sticky" top="0" bg="gray.100" width="100%" zIndex="10">
        <FormHeader
          title={t['accountingCreditNoteAddNewCreditNote']}
          closeLink="/accounting/sales/debit-note/list"
        />
      </Box>

      <Box bg="white">
        <FormProvider {...methods}>
          <form>
            <Box minH="calc(100vh - 170px)">
              <DebitNoteDetails getSelectedValue={getSelectedValue} />

              <DebitProductTable />

              <DebitBox />
            </Box>
          </form>
        </FormProvider>
      </Box>

      <Box position="sticky" bottom="0" bg="gray.100" width="100%" zIndex="10">
        <FormFooter mainButtonLabel="Save" mainButtonHandler={handleSubmit} />
      </Box>
    </Container>
  );
};
