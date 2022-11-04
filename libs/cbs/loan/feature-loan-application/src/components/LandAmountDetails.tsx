import { useEffect } from 'react';
import { useFormContext } from 'react-hook-form';

import { LoanAccountInput } from '@coop/cbs/data-access';
import { FormNumberInput, FormTextArea } from '@coop/shared/form';
import { Box, Button, Divider, Text, TextFields } from '@coop/shared/ui';

export const LoanAmountDetails = () => {
  const { watch, setError, clearErrors } = useFormContext<LoanAccountInput>();
  const totalLoanApplied = watch('appliedLoanAmount');

  const collaterals = watch('collateralData');
  const guarantee = watch('gurantee_details');
  const totalSanctionedAmount = watch('totalSanctionedAmount');

  const collateralSum =
    collaterals?.reduce((acc, curr) => Number(curr?.collaterallValuation ?? 0) + acc, 0) ?? 0;

  const guaranteeSum =
    guarantee?.reduce((acc, curr) => Number(curr?.guranteeAmount ?? 0) + acc, 0) ?? 0;

  useEffect(() => {
    if (Number(totalLoanApplied) < Number(totalSanctionedAmount)) {
      setError('totalSanctionedAmount', {
        message: 'Sanctioned amount should be less than applied amount.',
      });
    } else {
      clearErrors('totalSanctionedAmount');
    }
  }, [totalSanctionedAmount, totalLoanApplied]);

  return (
    <Box display="flex" flexDir="column" gap="s16">
      <Box display="flex" flexDir="column" gap="s4">
        <Text fontSize="r1" fontWeight="600" color="gray.800">
          Loan Amount Details
        </Text>
        <Text fontSize="s3" fontWeight="500" color="gray.600">
          Details of collateral valuation and disbursement amount
        </Text>
      </Box>
      <Box p="s16" border="1px" borderColor="border.layout" borderRadius="br2">
        <Box
          display="flex"
          flexDir="column"
          p="s16"
          gap="s16"
          borderRadius="br2"
          bg="background.500"
        >
          <Box display="flex" alignItems="center" justifyContent="space-between">
            <TextFields variant="formLabel">Total Loan Applied</TextFields>
            <Text fontSize="r1" color="gray.800" fontWeight="600">
              {totalLoanApplied ?? '0'}
            </Text>
          </Box>
          <Box display="flex" alignItems="center" justifyContent="space-between">
            <TextFields variant="formLabel">Total Valuation</TextFields>
            <Button variant="link" px={0} justifyContent="end">
              {collateralSum + guaranteeSum}
            </Button>
          </Box>
          <Box display="flex" alignItems="center" justifyContent="space-between">
            <TextFields variant="formLabel">Total Sanctioned Loan Amount</TextFields>
            <Box>
              <FormNumberInput name="totalSanctionedAmount" size="sm" />
            </Box>
          </Box>
        </Box>
      </Box>
      {Number(totalSanctionedAmount) >= collateralSum + guaranteeSum && (
        <>
          <Divider />
          <Box>
            <FormTextArea
              name="justifySanction"
              h="200px"
              label="If the sanctioned amount is greater than or equal to valuation amount. Please provide justification for it"
            />
          </Box>
        </>
      )}
    </Box>
  );
};
