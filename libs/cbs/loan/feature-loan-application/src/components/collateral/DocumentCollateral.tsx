import { useFormContext } from 'react-hook-form';

import { ValuationDocuments } from '@coop/cbs/loan';
import { FormInput } from '@coop/shared/form';
import { Grid, GridItem, Text } from '@coop/shared/ui';

import { ValuationRange } from './ValuationRange';
import { ValuationStats } from './ValuationStats';
import { ValuatorSelect } from './ValuatorSelect';
import { useLoanProductContext } from '../../hooks/useLoanProduct';

export const DocumentCollateral = () => {
  const { watch } = useFormContext();

  const { product } = useLoanProductContext();

  const collateralType = watch('collateralType');

  const collateral = product?.collateralValue?.find((c) => c?.type === collateralType);
  const minValue = collateral?.minValue;
  const maxValue = collateral?.maxValue;

  return (
    <Grid templateColumns="repeat(4, 1fr)" gap="s20">
      <GridItem colSpan={2}>
        <FormInput name="documentName" label="Document Name" />
      </GridItem>
      <ValuatorSelect />
      <GridItem colSpan={2}>
        <FormInput name="valuationAmount" label="Valuation Amount" />
      </GridItem>
      <GridItem colSpan={2}>
        <FormInput
          type="number"
          name="valuationPercent"
          label="Validation Percentage"
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
