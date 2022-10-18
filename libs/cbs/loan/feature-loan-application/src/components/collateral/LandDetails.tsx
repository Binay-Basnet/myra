import { FormInput } from '@coop/shared/form';
import { GridItem, Text } from '@coop/shared/ui';

export const LandDetails = () => (
  <>
    <GridItem colSpan={2}>
      <FormInput name="ownerName" label="Owner Name" />
    </GridItem>
    <GridItem colSpan={2}>
      <FormInput name="relation" label="Relation With Owner" />
    </GridItem>
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
