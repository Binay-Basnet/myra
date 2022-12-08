import { useState } from 'react';
import { useFormContext } from 'react-hook-form';
import { useDeepCompareEffect } from 'react-use';

import { Box, GridItem, Text } from '@myra-ui';

import { SalesSaleEntryInput } from '@coop/cbs/data-access';
import { FieldCardComponents } from '@coop/shared/components';
import { FormAmountInput, FormTextArea } from '@coop/shared/form';
import { useTranslation } from '@coop/shared/utils';

export const SalesBox = () => {
  const { t } = useTranslation();

  const { watch } = useFormContext<SalesSaleEntryInput>();

  const [subTotal, setSubTotal] = useState<number>(0);

  const [taxableTotal, setTaxableTotal] = useState<number>(0);

  const [totalTaxAmount, setTotalTaxAmount] = useState<number>(0);

  const discount = Number(watch('discount') ?? 0);

  const products = watch('products');

  useDeepCompareEffect(() => {
    if (products?.length) {
      let tempSubTotal = 0;
      let tempTotalTaxAmount = 0;
      products?.forEach((product) => {
        const tempAmount = Number(product.quantity) * Number(product.rate);
        tempSubTotal += tempAmount;

        tempTotalTaxAmount += (tempAmount * Number(product.tax)) / 100;
      });

      setSubTotal(tempSubTotal);
      setTaxableTotal(tempSubTotal - discount);

      setTotalTaxAmount(tempTotalTaxAmount);
    }
  }, [products, discount]);

  return (
    <Box display="grid" gap="s32" gridTemplateColumns="repeat(2,1fr)" p="s20">
      <FormTextArea name="notes" label={t['invFormNotes']} rows={5} />

      <FieldCardComponents rows="repeat(5,1fr)">
        <GridItem display="flex" justifyContent="space-between">
          <Text color="neutralColorLight.Gray-60" fontWeight="Medium" fontSize="s3">
            {t['invForSubTotal']}
          </Text>

          <Text color="neutralColorLight.Gray-50" fontWeight="Medium" fontSize="r1">
            {subTotal}
          </Text>
        </GridItem>

        <GridItem display="flex" justifyContent="space-between">
          <Text color="neutralColorLight.Gray-60" fontWeight="Medium" fontSize="s3">
            {t['invFormDiscount']}
          </Text>

          <Box width="200px">
            <FormAmountInput name="discount" bg="gray.0" size="sm" />
          </Box>
        </GridItem>

        <GridItem display="flex" justifyContent="space-between">
          <Text color="neutralColorLight.Gray-60" fontWeight="Medium" fontSize="s3">
            {t['invFormTaxableTotal']}
          </Text>
          <Text color="neutralColorLight.Gray-50" fontWeight="Medium" fontSize="r1">
            {taxableTotal}
          </Text>
        </GridItem>

        <GridItem display="flex" justifyContent="space-between">
          <Text color="neutralColorLight.Gray-60" fontWeight="Medium" fontSize="s3">
            {t['invFormVAT']}
          </Text>

          <Text color="neutralColorLight.Gray-50" fontWeight="Medium" fontSize="r1">
            {totalTaxAmount}
          </Text>
        </GridItem>

        <GridItem display="flex" justifyContent="space-between">
          <Text color="neutralColorLight.Gray-80" fontWeight="500" fontSize="s3">
            {t['invFormGrandTotal']}
          </Text>

          <Text color="neutralColorLight.Gray-70" fontWeight="Medium" fontSize="r1">
            {subTotal + totalTaxAmount - discount}
          </Text>
        </GridItem>
      </FieldCardComponents>
    </Box>
  );
};
