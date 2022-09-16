import { ValuationDocuments } from '@coop/cbs/loan';
import { FormInput } from '@coop/shared/form';
import { Grid, GridItem, Text } from '@coop/shared/ui';

import { ValuationStats } from './ValuationStats';
import { ValuatorSelect } from './ValuatorSelect';

export const VehicleCollateral = () => (
  <Grid templateColumns="repeat(4, 1fr)" gap="s20">
    <GridItem colSpan={2}>
      <FormInput name="ownerName" label="Owner Name" />
    </GridItem>
    <GridItem colSpan={2}>
      <FormInput name="relation" label="Relation With Owner" />
    </GridItem>

    <GridItem colSpan={2}>
      <FormInput name="vehicleName" label="Vehicle Name" />
    </GridItem>
    <GridItem colSpan={2}>
      <FormInput name="vehicleModelNo" label="Model No." />
    </GridItem>
    <GridItem colSpan={2}>
      <FormInput name="vehicleRegistrationNo" label="Registration No." />
    </GridItem>
    <GridItem colSpan={2}>
      <FormInput name="vehicleNo" label="Model No." />
    </GridItem>
    <FormInput name="vehicleSeatCapacity" label="Seat Capacity" />
    <FormInput name="vehicleCapacity" label="Engine Capacity" />
    <FormInput name="vehicleType" label="Vehicle Type" />
    <FormInput name="vehicleFuelType" label="Fuel Type" />

    <ValuatorSelect />
    <GridItem />
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
    <ValuationStats />
    <ValuationDocuments />
  </Grid>
);
