import { useFormContext } from 'react-hook-form';

import { GridItem, Text, TextFields } from '@coop/shared/ui';

export const ValuationStats = () => {
  const { watch } = useFormContext();
  const maxAmount = watch('fmvMaxAmount');
  const minAmount = watch('dvMinAmount');
  const valuationMethod = watch('valuationMethod');
  const validationPer = watch('valuationPercent');
  const amount = watch('valuationAmount');

  const FMVCalculations = (Number(maxAmount) * Number(validationPer)) / 100;
  const DVCalculations = (Number(minAmount) * Number(validationPer)) / 100;
  const normalCalculations = (Number(amount) * Number(validationPer)) / 100;

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
      <TextFields variant="formLabel" color="gray.600">
        Collateral Valuation
      </TextFields>

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
