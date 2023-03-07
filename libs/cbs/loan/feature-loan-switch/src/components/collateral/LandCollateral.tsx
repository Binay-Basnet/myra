import { FormSection, GridItem } from '@myra-ui';

import { ValuationDocuments } from '@coop/cbs/loan';

import { LandDetails } from './LandDetails';
import { ValuationInputs } from './ValuationInputs';
import { ValuatorSelect } from './ValuatorSelect';

export const LandCollateral = () => (
  <FormSection templateColumns={2}>
    <LandDetails />
    <ValuatorSelect />
    <GridItem />
    <ValuationInputs />
    <ValuationDocuments />
  </FormSection>
);
