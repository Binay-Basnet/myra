import { Text } from '@myra-ui';

import { FormInput } from '@coop/shared/form';

export const LandDetails = () => (
  <>
    <FormInput name="sheetNo" label="Sheet No" />
    <FormInput name="plotNo" label="Plot No" />
    <FormInput name="kittaNo" label="Kitta No" />
    <FormInput
      name="area"
      label="Area"
      rightElement={
        <Text fontWeight="Medium" noOfLines={1} fontSize="r1" color="primary.500">
          sq. km
        </Text>
      }
    />
  </>
);
