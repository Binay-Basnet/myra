import { useEffect } from 'react';
import { useFormContext } from 'react-hook-form';

import { Box, Grid } from '@myra-ui';

import { FormAmountInput, FormCheckbox, FormFileInput } from '@coop/shared/form';

export const Discount = () => {
  const { watch, resetField } = useFormContext();

  const isFinePaid = watch('isFinePaid');

  // const payableFine = watch('discount.amount');

  // const newFine = useMemo(() => totalFine - Number(discountAmount), [totalFine, discountAmount]);

  useEffect(() => {
    if (!isFinePaid) {
      resetField('penalty.amount');
      resetField('penalty.doc');
    }
  }, [isFinePaid]);

  return (
    <>
      <FormCheckbox name="isFinePaid" label="Fine Applicable" />

      {isFinePaid && (
        <Box
          display="flex"
          flexDirection="column"
          gap="s16"
          p="s16"
          backgroundColor="highlight.500"
        >
          <Grid templateColumns="repeat(2, 1fr)" gap="s16">
            <FormAmountInput name="penalty.amount" label="Payable Fine" />

            <FormFileInput name="penalty.doc" label="File Upload" size="sm" />
          </Grid>

          {/* {payableFine ? (
            <>
              <Divider />

              <Box display="flex" flexDirection="column" gap="s4">
                <Text fontSize="s3" color="gray.700" fontWeight={500}>
                  New Fine Amount
                </Text>
                <Text fontSize="s3" color="gray.700" fontWeight={400}>
                  {amountConverter(payableFine || 0)}
                </Text>
              </Box>
            </>
          ) : null} */}
        </Box>
      )}
    </>
  );
};
