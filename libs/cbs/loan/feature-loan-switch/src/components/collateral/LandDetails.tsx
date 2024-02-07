import { GridItem } from '@myra-ui';

import { FormInput } from '@coop/shared/form';

export const LandDetails = () => (
  <>
    <GridItem colSpan={2}>
      <FormInput name="sheetNo" label="Sheet No" />
    </GridItem>
    <GridItem colSpan={2}>
      <FormInput name="plotNo" label="Plot No" />
    </GridItem>
    <GridItem colSpan={2}>
      <FormInput name="kittaNo" label="Kitta No" />
    </GridItem>
    <GridItem colSpan={2}>
      <FormInput name="area" label="Area" />
    </GridItem>
  </>
);
