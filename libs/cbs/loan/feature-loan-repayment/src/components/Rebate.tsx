import { useEffect } from 'react';
import { useFormContext } from 'react-hook-form';

import { Box, Grid } from '@myra-ui';

import { FormAmountInput, FormCheckbox, FormFileInput } from '@coop/shared/form';

export const Rebate = () => {
  const { watch, resetField } = useFormContext();

  const isRebateApplied = watch('isRebateApplied');

  useEffect(() => {
    if (!isRebateApplied) {
      resetField('rebate.amount');
      resetField('rebate.doc');
    }
  }, [isRebateApplied]);

  return (
    <>
      <FormCheckbox name="isRebateApplied" label="Rebate Applicable" />

      {isRebateApplied && (
        <Box
          display="flex"
          flexDirection="column"
          gap="s16"
          p="s16"
          backgroundColor="highlight.500"
        >
          <Grid templateColumns="repeat(2, 1fr)" gap="s16">
            <FormAmountInput name="rebate.amount" label="Rebate" />

            <FormFileInput name="rebate.doc" label="File Upload" size="sm" />
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
