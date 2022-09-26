import { ValuationDocuments } from '@coop/cbs/loan';
import { Grid, GridItem } from '@coop/shared/ui';

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
