import { useState } from 'react';
import { useFormContext } from 'react-hook-form';
import { useDeepCompareEffect } from 'react-use';

import { SalesCreditNoteInput } from '@coop/cbs/data-access';
import { FieldCardComponents } from '@coop/shared/components';
import { FormTextArea } from '@coop/shared/form';
import { Box, GridItem, Text } from '@coop/shared/ui';
import { useTranslation } from '@coop/shared/utils';

export const CreditBox = () => {
  const { t } = useTranslation();

  const { watch } = useFormContext<SalesCreditNoteInput>();

  const [subTotal, setSubTotal] = useState<number>(0);

  const [taxableTotal, setTaxableTotal] = useState<number>(0);

  const [totalTaxAmount, setTotalTaxAmount] = useState<number>(0);

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
      setTaxableTotal(tempSubTotal);

      setTotalTaxAmount(tempTotalTaxAmount);
    }
  }, [products]);

  return (
    <Box display="grid" gap="s32" gridTemplateColumns="repeat(2,1fr)" p="s20">
      <FormTextArea name="notes" label={t['accountingCreditNoteAddNotes']} rows={5} />

      <FieldCardComponents rows="repeat(5,1fr)">
        <GridItem display="flex" justifyContent="space-between">
          <Text color="neutralColorLight.Gray-60" fontWeight="Medium" fontSize="s3">
            {t['accountingCreditNoteAddSubTotal']}
          </Text>

          <Text color="neutralColorLight.Gray-50" fontWeight="Medium" fontSize="r1">
            {subTotal}
          </Text>
        </GridItem>

        <GridItem display="flex" justifyContent="space-between">
          <Text color="neutralColorLight.Gray-60" fontWeight="Medium" fontSize="s3">
            {t['accountingCreditNoteAddTaxableTotal']}
          </Text>
          <Text color="neutralColorLight.Gray-50" fontWeight="Medium" fontSize="r1">
            {taxableTotal}
          </Text>
        </GridItem>

        <GridItem display="flex" justifyContent="space-between">
          <Text color="neutralColorLight.Gray-60" fontWeight="Medium" fontSize="s3">
            {t['accountingCreditNoteAddVAT']}
          </Text>

          <Text color="neutralColorLight.Gray-50" fontWeight="Medium" fontSize="r1">
            {totalTaxAmount}
          </Text>
        </GridItem>

        <GridItem display="flex" justifyContent="space-between">
          <Text color="neutralColorLight.Gray-80" fontWeight="500" fontSize="s3">
            {t['accountingCreditNoteAddGrandTotal']}
          </Text>

          <Text color="neutralColorLight.Gray-70" fontWeight="Medium" fontSize="r1">
            {subTotal + totalTaxAmount}
          </Text>
        </GridItem>
      </FieldCardComponents>
    </Box>
  );
};
