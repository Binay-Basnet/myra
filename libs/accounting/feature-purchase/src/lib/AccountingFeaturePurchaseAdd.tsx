import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useRouter } from 'next/router';

import { asyncToast, Box, GridItem, Text } from '@myra-ui';

import {
  PurchaseEntryInput,
  useGetInventoryItemsListQuery,
  useSetPurchaseEntryMutation,
} from '@coop/cbs/data-access';
import { ROUTES } from '@coop/cbs/utils';
import { FieldCardComponents } from '@coop/shared/components';
import { FormLayout, FormNumberInput, FormTextArea } from '@coop/shared/form';
import { useTranslation } from '@coop/shared/utils';

import { PurchaseDetails, PurchaseTable } from '../components';

type PurchaseEntryForm = Omit<PurchaseEntryInput, 'itemDetails'> & {
  itemDetails: {
    itemId: { label: string; value: string };
    amount?: string;
    description?: string;
    itemName?: string;
    quantity?: string;
    rate?: string;
    tax?: string;
    taxValue?: string;
    warehouse?: string;
    warehouseName?: string;
  }[];
};

export const AccountingFeaturePurchaseAdd = () => {
  const methods = useForm<PurchaseEntryForm>();
  const { watch } = methods;

  const [grandTotal, setGrandTotal] = useState(0);
  const { t } = useTranslation();
  const router = useRouter();
  const { mutateAsync: AddItems } = useSetPurchaseEntryMutation();

  const { data: inventoryItems } = useGetInventoryItemsListQuery({
    pagination: {
      after: '',
      first: -1,
    },
  });
  const inventoryItemsData = inventoryItems?.inventory?.items?.list?.edges;

  const handleSave = () => {
    const values = methods.getValues();

    const filteredValues = {
      ...values,
      itemDetails: values?.['itemDetails']?.map((product) => ({
        ...product,
        itemId: product.itemId.value,
        tax: inventoryItemsData?.find((item) => item?.node?.id === product?.itemId.value)?.node
          ?.taxId,
      })),
    };

    asyncToast({
      id: 'account-open-add-minor',
      promise: AddItems({
        data: {
          ...filteredValues,
        },
      }),
      msgs: {
        loading: 'Adding New Purchase',
        success: 'New Purchase Added',
      },
      onSuccess: () => {
        router.push(ROUTES.ACCOUNTING_PURCHASE_LIST);
        // router.push('/accounting/investment/investment-transaction/list');
      },
    });
  };

  const itemDetails = watch('itemDetails');

  const totalAmount = itemDetails?.reduce((a, b) => a + Number(b?.amount), 0);
  const discount = watch('discount');
  const taxableTotal = Number(totalAmount || '0') - Number(discount || '0');
  const totalVat = itemDetails?.reduce((a, b) => a + (Number(b?.amount) * Number(b?.tax)) / 100, 0);

  useEffect(() => {
    const grandTot = Number(taxableTotal) + Number(totalVat);
    setGrandTotal(grandTot);
  }, [itemDetails, discount]);

  return (
    <FormLayout methods={methods}>
      <FormLayout.Header title="New Purchase Entry" />
      <FormLayout.Content>
        <FormLayout.Form>
          <PurchaseDetails />

          <PurchaseTable />

          <Box pt="s16" px="s16">
            <Box display="grid" gap="s32" gridTemplateColumns="repeat(2,1fr)">
              <FormTextArea
                name="notes"
                label={t['accountingPurchaseAddNotes']}
                __placeholder={t['accountingPurchaseAddNote']}
                rows={5}
              />
              <Box display="flex" flexDirection="column" gap="s24">
                <Box display="flex" justifyContent="space-between">
                  <Text fontWeight="500" fontSize="r1" display="flex" alignItems="center">
                    Discount
                  </Text>
                  <Box w="200px">
                    <FormNumberInput
                      width="100%"
                      name="discount"
                      label=""
                      textAlign="right"
                      bg="gray.0"
                    />
                  </Box>
                </Box>
                <FieldCardComponents rows="repeat(5,1fr)">
                  <GridItem display="flex" justifyContent="space-between">
                    <Text color="neutralColorLight.Gray-60" fontWeight="Medium" fontSize="s3">
                      {t['accountingPurchaseAddSubTotal']}
                    </Text>

                    <Text color="neutralColorLight.Gray-50" fontWeight="Medium" fontSize="r1">
                      {totalAmount}
                    </Text>
                  </GridItem>

                  <GridItem display="flex" justifyContent="space-between">
                    <Text color="neutralColorLight.Gray-60" fontWeight="Medium" fontSize="s3">
                      {t['accountingPurchaseAddDiscount']}
                    </Text>
                    <Text color="neutralColorLight.Gray-50" fontWeight="Medium" fontSize="r1">
                      {discount ?? '0'}
                    </Text>
                  </GridItem>

                  <GridItem display="flex" justifyContent="space-between">
                    <Text color="neutralColorLight.Gray-60" fontWeight="Medium" fontSize="s3">
                      {t['accountingPurchaseAddTaxableTotal']}
                    </Text>
                    <Text color="neutralColorLight.Gray-50" fontWeight="Medium" fontSize="r1">
                      {taxableTotal}
                    </Text>
                  </GridItem>

                  <GridItem display="flex" justifyContent="space-between">
                    <Text color="neutralColorLight.Gray-60" fontWeight="Medium" fontSize="s3">
                      {t['accountingPurchaseAddVAT']}
                    </Text>

                    <Text color="neutralColorLight.Gray-50" fontWeight="Medium" fontSize="r1">
                      {totalVat}
                    </Text>
                  </GridItem>

                  <GridItem display="flex" justifyContent="space-between">
                    <Text color="neutralColorLight.Gray-80" fontWeight="500" fontSize="s3">
                      {t['accountingPurchaseAddGrandTotal']}
                    </Text>

                    <Text color="neutralColorLight.Gray-70" fontWeight="Medium" fontSize="r1">
                      {grandTotal}
                    </Text>
                  </GridItem>
                </FieldCardComponents>
              </Box>
            </Box>
          </Box>
        </FormLayout.Form>
      </FormLayout.Content>
      <FormLayout.Footer mainButtonLabel={t['submit']} mainButtonHandler={handleSave} />{' '}
    </FormLayout>
  );
};
