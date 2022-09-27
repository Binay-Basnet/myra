import { ValuationDocuments } from '@coop/cbs/loan';
import { FormInput } from '@coop/shared/form';
import { Grid, GridItem, Text } from '@coop/shared/ui';

import { ValuationRange } from './ValuationRange';
import { ValuationStats } from './ValuationStats';
import { ValuatorSelect } from './ValuatorSelect';

export const OtherCollateral = () => (
  <Grid templateColumns="repeat(4, 1fr)" gap="s20">
    <GridItem colSpan={2}>
      <FormInput name="collateralName" label="Collateral Name" />
    </GridItem>
    <ValuatorSelect />
    <GridItem colSpan={2}>
      <FormInput name="valuationAmount" label="Valuation Amount" />
    </GridItem>
    <GridItem colSpan={2}>
      <FormInput
        name="valuationPercent"
        label="Validation Percentage"
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