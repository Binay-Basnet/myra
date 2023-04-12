import { useEffect, useMemo } from 'react';
import { useFormContext } from 'react-hook-form';

import { Box, Divider, Grid, Text } from '@myra-ui';

import { FormAmountInput, FormCheckbox, FormFileInput } from '@coop/shared/form';
import { amountConverter } from '@coop/shared/utils';

export const Discount = ({ totalFine }: { totalFine: number }) => {
  const { watch, resetField } = useFormContext();

  const isDiscountApplied = watch('isDiscountApplied');

  const discountAmount = watch('discount.amount');

  const newFine = useMemo(() => totalFine - Number(discountAmount), [totalFine, discountAmount]);

  useEffect(() => {
    if (!isDiscountApplied) {
      resetField('discount.amount');
      resetField('discount.doc');
    }
  }, [isDiscountApplied]);

  return (
    <>
      <FormCheckbox name="isDiscountApplied" label="Add Discount" />

      {isDiscountApplied && (
        <Box
          display="flex"
          flexDirection="column"
          gap="s16"
          p="s16"
          backgroundColor="highlight.500"
        >
          <Grid templateColumns="repeat(2, 1fr)" gap="s16">
            <FormAmountInput name="discount.amount" label="Discount Amount" />

            <FormFileInput name="discount.doc" label="File Upload" size="sm" />
          </Grid>

          {newFine ? (
            <>
              <Divider />

              <Box display="flex" flexDirection="column" gap="s4">
                <Text fontSize="s3" color="gray.700" fontWeight={500}>
                  New Fine Amount
                </Text>
                <Text fontSize="s3" color="gray.700" fontWeight={400}>
                  {amountConverter(newFine)}
                </Text>
              </Box>
            </>
          ) : null}
        </Box>
      )}
    </>
  );
};
