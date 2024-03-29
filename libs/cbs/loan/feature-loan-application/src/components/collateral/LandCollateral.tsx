import { Grid, GridItem } from '@myra-ui';

import { ValuationDocuments } from '@coop/cbs/loan';

import { LandDetails } from './LandDetails';
import { ValuationInputs } from './ValuationInputs';
import { ValuatorSelect } from './ValuatorSelect';

export const LandCollateral = () => (
  <Grid templateColumns="repeat(4, 1fr)" gap="s20">
    <LandDetails />
    <ValuatorSelect />
    <GridItem />
    <ValuationInputs />
    <ValuationDocuments />
  </Grid>
);
