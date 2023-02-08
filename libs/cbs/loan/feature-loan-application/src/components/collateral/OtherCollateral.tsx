import { useFormContext } from 'react-hook-form';

import { Grid, GridItem, Text } from '@myra-ui';

import { ValuationDocuments } from '@coop/cbs/loan';
import { FormInput } from '@coop/shared/form';

import { ValuationRange } from './ValuationRange';
import { ValuationStats } from './ValuationStats';
import { ValuatorSelect } from './ValuatorSelect';
import { useLoanProductContext } from '../../hooks/useLoanProduct';

export const OtherCollateral = () => {
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
    <Grid templateColumns="repeat(4, 1fr)" gap="s20">
      {/* <GridItem colSpan={2}>
        <FormInput name="collateralName" label="Collateral Name" />
      </GridItem> */}
      <ValuatorSelect />
      <GridItem colSpan={2}>
        <FormInput name="valuationAmount" label="Valuation Amount" />
      </GridItem>
      <GridItem colSpan={2}>
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
      </GridItem>
      <ValuationRange />
      <ValuationStats />
      <ValuationDocuments />
    </Grid>
  );
};
