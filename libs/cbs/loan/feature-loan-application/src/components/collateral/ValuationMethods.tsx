import { useFormContext } from 'react-hook-form';

import { FormInput, FormSwitchTab } from '@coop/shared/form';
import { Box, GridItem, Text } from '@myra-ui';

import { useLoanProductContext } from '../../hooks/useLoanProduct';

export const ValuationMethods = () => {
  const { watch } = useFormContext();

  const { product } = useLoanProductContext();

  const collateralType = watch('collateralType');
  const valuationMethod = watch('valuationMethod');

  const collateral = product?.collateralValue?.find((c) => c?.type === collateralType);
  const maxValue =
    valuationMethod === 'FMV'
      ? collateral?.maxFMV
      : valuationMethod === 'DV'
      ? collateral?.maxDV
      : collateral?.maxValue;
  const minValue =
    valuationMethod === 'FMV'
      ? collateral?.minFMV
      : valuationMethod === 'DV'
      ? collateral?.minDV
      : collateral?.minValue;

  return (
    <GridItem
      colSpan={4}
      p="s16"
      display="flex"
      alignItems="center"
      justifyContent="space-between"
      border="1px"
      borderColor="border.layout"
      borderRadius="br2"
    >
      <FormSwitchTab
        name="valuationMethod"
        label="Valuation Method"
        options={[
          { label: 'FMV', value: 'FMV' },
          { label: 'DV', value: 'DV' },
        ]}
      />
      <Box>
        <FormInput
          name="valuationPercent"
          label="Valuation Percentage"
          rules={{
            max: {
              value: Number(maxValue),
              message: 'Percentage is invalid',
            },
            min: {
              value: Number(minValue),
              message: 'Percentage  is invalid',
            },
          }}
          rightElement={
            <Text fontWeight="Medium" noOfLines={1} fontSize="r1" color="primary.500">
              %
            </Text>
          }
        />
      </Box>
    </GridItem>
  );
};
