import { useEffect, useState } from 'react';
import { useFormContext } from 'react-hook-form';

import { Box, GridItem, Text } from '@myra-ui';

import { PurchaseItemDetails, SalesSaleEntryInput } from '@coop/cbs/data-access';
import { FieldCardComponents } from '@coop/shared/components';
import { FormAmountInput, FormTextArea } from '@coop/shared/form';
import { useTranslation } from '@coop/shared/utils';

export const SalesBox = () => {
  const { t } = useTranslation();

  const { watch } = useFormContext<SalesSaleEntryInput>();

  const [grandToal, setGrandTotal] = useState<number>(0);

  const itemDetails = watch('products') as PurchaseItemDetails[];

  const totalAmount = itemDetails?.reduce((a, b) => a + Number(b?.amount), 0);
  const discount = watch('discount');
  const taxableTotal = Number(totalAmount || '0') - Number(discount || '0');
  const totalVat = itemDetails?.reduce((a, b) => a + (Number(b?.amount) * Number(b?.tax)) / 100, 0);

  useEffect(() => {
    const grandTot = Number(taxableTotal) + Number(totalVat);
    setGrandTotal(grandTot);
  }, [itemDetails, discount]);

  return (
    <Box display="grid" gap="s32" gridTemplateColumns="repeat(2,1fr)" p="s20">
      <FormTextArea name="notes" label={t['invFormNotes']} rows={5} />
      <Box display="flex" flexDirection="column" gap="s24">
        <Box display="flex" justifyContent="space-between">
          <Text fontWeight="500" fontSize="r1" display="flex" alignItems="center">
            Discount{' '}
          </Text>
          <Box w="200px">
            <FormAmountInput width="100%" name="discount" textAlign="right" bg="gray.0" />
          </Box>
        </Box>
        <FieldCardComponents rows="repeat(5,1fr)">
          <GridItem display="flex" justifyContent="space-between">
            <Text color="neutralColorLight.Gray-60" fontWeight="Medium" fontSize="s3">
              {t['invForSubTotal']}
            </Text>

            <Text color="neutralColorLight.Gray-50" fontWeight="Medium" fontSize="r1">
              {totalAmount}
            </Text>
          </GridItem>

          <GridItem display="flex" justifyContent="space-between">
            <Text color="neutralColorLight.Gray-60" fontWeight="Medium" fontSize="s3">
              {t['invFormDiscount']}
            </Text>
            <Text color="neutralColorLight.Gray-50" fontWeight="Medium" fontSize="r1">
              {discount ?? '0'}
            </Text>
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
              {totalVat}
            </Text>
          </GridItem>

          <GridItem display="flex" justifyContent="space-between">
            <Text color="neutralColorLight.Gray-80" fontWeight="500" fontSize="s3">
              {t['invFormGrandTotal']}
            </Text>

            <Text color="neutralColorLight.Gray-70" fontWeight="Medium" fontSize="r1">
              {grandToal}
            </Text>
          </GridItem>
        </FieldCardComponents>
      </Box>
    </Box>
  );
};
