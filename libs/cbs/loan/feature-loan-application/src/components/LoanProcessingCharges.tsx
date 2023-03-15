import { useEffect } from 'react';
import { useFormContext } from 'react-hook-form';

import { Box, Text } from '@myra-ui';

import { LoanAccountInput } from '@coop/cbs/data-access';
import { FormAmountInput } from '@coop/shared/form';
import { amountConverter } from '@coop/shared/utils';

import { useLoanProductContext } from '../hooks/useLoanProduct';

export const LoanProcessingCharge = () => {
  const { product } = useLoanProductContext();

  const loanProcessingCharges = product?.loanProcessingCharge;

  const { watch, register, setValue } = useFormContext<LoanAccountInput>();
  const sactionAmount = watch('totalSanctionedAmount');

  useEffect(() => {
    loanProcessingCharges?.map((val, index) =>
      setValue(
        `loanProcessingCharge.${index}.amount`,
        calculateAmount(val?.percentage, val?.amount)
      )
    );
  }, [loanProcessingCharges, setValue, sactionAmount]);

  const serviceCharge = watch('loanProcessingCharge');
  const calculateAmount = (x: number | null | undefined, y: number | null): string => {
    if (x && y) {
      const value = (x / 100) * Number(sactionAmount);
      const amount = value + Number(y);
      return String(amount);
    }
    if (y) {
      return String(y);
    }
    return '0';
  };

  if (!product) {
    return null;
  }

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
            value: calculateAmount(val?.percentage, val?.amount),
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
                <FormAmountInput
                  name={`loanProcessingCharge.${index}.amount`}
                  defaultValue={calculateAmount(val?.percentage, val?.amount)}
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
              ? amountConverter(serviceCharge?.reduce((a, b) => a + Number(b?.amount), 0))
              : amountConverter(
                  loanProcessingCharges?.reduce((a, b) => a + Number(b?.amount), 0) ?? 0
                )}
          </Text>
        </Box>
      </Box>
    </Box>
  );
};
