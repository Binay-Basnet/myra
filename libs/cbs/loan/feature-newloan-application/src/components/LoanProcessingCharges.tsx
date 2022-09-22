import { useFormContext } from 'react-hook-form';

import { LoanAccountInput } from '@coop/cbs/data-access';
import { FormInput } from '@coop/shared/form';
import { Box, Text } from '@coop/shared/ui';

import { useLoanProductContext } from '../hooks/useLoanProduct';

export const LoanProcessingCharge = () => {
  const { product } = useLoanProductContext();
  const { watch, register } = useFormContext<LoanAccountInput>();
  const serviceCharge = watch('loanProcessingCharge');

  const loanProcessingCharges = product?.loanProcessingCharge;
  return (
    <Box display="flex" flexDirection="column" gap="s16">
      <Box display="flex" flexDirection="column" gap="s4">
        <Text fontSize="r1" fontWeight="600">
          Loan Processing Charges
        </Text>
        <Text fontSize="s2" fontWeight="400">
          Details of collateral valuation and disbursement amount
        </Text>
      </Box>
      <Box
        display="flex"
        flexDirection="column"
        gap="s8"
        p="s16"
        bg="border.layout"
        borderRadius="br2"
      >
        {loanProcessingCharges?.map((val, index) => {
          register(`loanProcessingCharge.${index}.serviceName`, {
            value: val?.serviceName,
          });

          register(`loanProcessingCharge.${index}.amount`, {
            value: val?.amount,
          });
          register(`loanProcessingCharge.${index}.ledgerName`, {
            value: val?.ledgerName,
          });

          // register(`serviceCharge.${index}.ledgerCode`, {
          //   value: data?.ledgerName,
          // });

          return (
            <Box
              key={`${val?.ledgerName}${val?.serviceName}`}
              display="flex"
              flexDirection="row"
              justifyContent="space-between"
              py="s16"
            >
              <Box>
                <Text fontSize="s3" fontWeight="500">
                  {val?.serviceName}
                </Text>
              </Box>
              <Box w="250px">
                <FormInput
                  textAlign="right"
                  name={`loanProcessingCharge.${index}.amount`}
                  defaultValue={val?.amount}
                />
              </Box>
            </Box>
          );
        })}
        <Box display="flex" flexDirection="row" justifyContent="space-between" py="s16">
          <Text fontSize="s3" fontWeight="600">
            Total Charges
          </Text>

          <Text fontSize="s3" fontWeight="600">
            {serviceCharge
              ? serviceCharge?.reduce((a, b) => a + Number(b?.amount), 0)
              : loanProcessingCharges?.reduce((a, b) => a + Number(b?.amount), 0)}
          </Text>
        </Box>
      </Box>
    </Box>
  );
};
