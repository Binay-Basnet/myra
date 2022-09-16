import { LoanProduct } from '@coop/cbs/data-access';
import { ValuationDocuments } from '@coop/cbs/loan';
import { Grid, GridItem } from '@coop/shared/ui';

import { LandDetails } from './LandDetails';
import { ValuationInputs } from './ValuationInputs';
import { ValuatorSelect } from './ValuatorSelect';

interface LandCollateralProps {
  product: LoanProduct;
}

export const LandCollateral = ({ product }: LandCollateralProps) => (
  <Grid templateColumns="repeat(4, 1fr)" gap="s20">
    <LandDetails />
    <ValuatorSelect />
    <GridItem />
    <ValuationInputs product={product} />
    <ValuationDocuments />
  </Grid>
);
