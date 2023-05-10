import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useRouter } from 'next/router';
import { useQueryClient } from '@tanstack/react-query';

import { asyncToast } from '@myra-ui';

import {
  PurchaseDebitNoteInput,
  SalesSaleEntryEntry,
  useAddNewDebitNoteMutation,
} from '@coop/cbs/data-access';
import { FormLayout } from '@coop/shared/form';
import { useTranslation } from '@coop/shared/utils';

import { DebitBox } from '../components/debit-note/DebitBox';
import { DebitNoteDetails } from '../components/debit-note/DebitNoteDetails';
import { DebitProductTable } from '../components/debit-note/DebitProductTable';

export const AccountingFeaturePurchaseAddDebitNote = () => {
  const { t } = useTranslation();
  // const [newId, setNewId] = useState('');

  const [selectedSales, setSelectedSales] = useState<
    Partial<SalesSaleEntryEntry> | null | undefined
  >();

  const router = useRouter();

  // const getNewId = useGetNewIdMutation({});

  // useEffect(() => {
  //   getNewId?.mutateAsync({}).then((res) => setNewId(res?.newId));
  // }, []);

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
    <FormLayout methods={methods}>
      <FormLayout.Header
        title={t['accountingCreditNoteAddNewCreditNote']}
        closeLink="/accounting/sales/debit-note/list"
      />

      <FormLayout.Content>
        <FormLayout.Form>
          <DebitNoteDetails getSelectedValue={getSelectedValue} />

          <DebitProductTable />

          <DebitBox />
        </FormLayout.Form>
      </FormLayout.Content>

      <FormLayout.Footer mainButtonLabel="Save" mainButtonHandler={handleSubmit} />
    </FormLayout>
  );
};
