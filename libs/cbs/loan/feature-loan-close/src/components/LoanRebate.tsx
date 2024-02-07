import { useEffect, useMemo } from 'react';
import { useFormContext } from 'react-hook-form';

import { Box, Grid, Text } from '@myra-ui';

import { useGetLoanPreviewQuery } from '@coop/cbs/data-access';
import { FormAmountInput, FormCheckbox, FormFileInput } from '@coop/shared/form';
import { amountConverter } from '@coop/shared/utils';

export const LoanRebate = () => {
  const { watch, resetField } = useFormContext();

  const isRebateApplied = watch('isRebateApplied');

  useEffect(() => {
    if (!isRebateApplied) {
      resetField('rebate.amount');
      resetField('rebate.doc');
    }
  }, [isRebateApplied]);

  const loanAccountId = watch('loanAccountId');

  const { data: loanPreviewData } = useGetLoanPreviewQuery(
    {
      id: loanAccountId,
    },
    {
      enabled: !!loanAccountId,
    }
  );

  const totalRebate = useMemo(() => {
    const paymentSchedule = loanPreviewData?.loanAccount?.loanPreview?.data?.paymentSchedule;

    return paymentSchedule?.installments?.reduce(
      (sum, installment) => sum + (Number(installment?.rebate) || 0),
      0
    );
  }, [loanPreviewData]);

  return (
    <>
      <Box display="flex" justifyContent="space-between">
        <Text fontSize="s3" fontWeight={500} color="gray.700">
          Rebate Available
        </Text>

        <Box display="flex" gap="s4" alignItems="center">
          <Text fontSize="s3" fontWeight={500} color="gray.700">
            {amountConverter(totalRebate || 0)}
          </Text>
        </Box>
      </Box>

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
        </Box>
      )}
    </>
  );
};
