import { useEffect } from 'react';
import { useFormContext } from 'react-hook-form';

import { GridItem, Text } from '@myra-ui';

export const ValuationStats = () => {
  const { watch, setValue } = useFormContext();
  const maxAmount = watch('fmvMaxAmount');
  const minAmount = watch('dvMinAmount');
  const valuationMethod = watch('valuationMethod');
  const validationPer = watch('valuationPercent');
  const amount = watch('valuationAmount');

  const FMVCalculations = (Number(maxAmount) * Number(validationPer)) / 100;
  const DVCalculations = (Number(minAmount) * Number(validationPer)) / 100;
  const normalCalculations = (Number(amount) * Number(validationPer)) / 100;

  useEffect(() => {
    if (valuationMethod && validationPer) {
      setValue(
        'collaterallValuation',
        String(valuationMethod === 'FMV' ? FMVCalculations : DVCalculations)
      );
    } else if (!valuationMethod && validationPer) {
      setValue('collaterallValuation', String(normalCalculations));
    }
  }, [
    setValue,
    FMVCalculations,
    DVCalculations,
    normalCalculations,
    valuationMethod,
    validationPer,
  ]);

  return (
    <GridItem
      colSpan={4}
      h="s40"
      display="flex"
      alignItems="center"
      justifyContent="space-between"
      px="s10"
      bg="background.500"
      borderRadius="br2"
    >
      <Text variant="formLabel" color="gray.600">
        Collateral Valuation
      </Text>

      {valuationMethod && validationPer && (
        <Text color="gray.700" fontSize="r1" fontWeight="600">
          {valuationMethod === 'FMV' ? FMVCalculations : DVCalculations}
        </Text>
      )}
      {!valuationMethod && validationPer && (
        <Text color="gray.700" fontSize="r1" fontWeight="600">
          {normalCalculations}
        </Text>
      )}
    </GridItem>
  );
};
