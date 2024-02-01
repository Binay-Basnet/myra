import { GridItem, Text } from '@myra-ui';

import { FormFileInput, FormTextArea } from '@coop/shared/form';

export const ValuationDocuments = () => (
  <>
    <GridItem colSpan={4}>
      <FormTextArea h="100px" name="collateralDescription" label="Collateral Description" />
    </GridItem>
    <GridItem colSpan={4}>
      <Text color="gray.800" fontSize="r1" fontWeight="600">
        Required Documents
      </Text>
    </GridItem>
    <GridItem colSpan={2}>
      <FormFileInput generateUrls name="collateralFiles" label="Collateral Files" size="lg" isPdf />
    </GridItem>
    <GridItem colSpan={2}>
      <FormFileInput generateUrls name="valuationFiles" label="Valuation Files" size="lg" isPdf />
    </GridItem>
  </>
);
