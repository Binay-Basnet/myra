import { GridItem } from '@myra-ui';

import { FormNumberInput } from '@coop/shared/form';

export const ValuationAmount = () => (
  <>
    <GridItem colSpan={2}>
      <FormNumberInput name="fmvMaxAmount" label="FMV (Maximum Amount)" />
    </GridItem>
    <GridItem colSpan={2}>
      <FormNumberInput name="dvMinAmount" label="DV (Minimum Amount)" />
    </GridItem>
  </>
);
