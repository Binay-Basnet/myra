import { FormFileInput, FormTextArea } from '@coop/shared/form';
import { GridItem, Text } from '@coop/shared/ui';

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
      <FormFileInput generateUrls name="collateralFiles" label="Collateral Files" size="lg" />
    </GridItem>
    <GridItem colSpan={2}>
      <FormFileInput generateUrls name="valuationFiles" label="Valuation Files" size="lg" />
    </GridItem>
  </>
);
