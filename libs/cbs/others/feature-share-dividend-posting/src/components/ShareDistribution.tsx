import { FormNumberInput, FormSelect } from '@coop/shared/form';
import { FormSection, GridItem, Text } from '@myra-ui';

export const ShareDistribution = () => (
  <FormSection header="Share Distribution">
    <GridItem colSpan={2}>
      <FormSelect name="taxRateLedgerMapping" label="Tax Rate Ledger Mapping" />
    </GridItem>

    <FormNumberInput
      name="taxRate"
      label="Tax Rate"
      rightElement={
        <Text fontWeight="Medium" fontSize="r1" color="primary.500">
          %
        </Text>
      }
    />

    <GridItem colSpan={2}>
      <FormSelect name="accountMapping" label="Account Mapping" />
    </GridItem>

    <FormSelect name="whoPaysTax" label="Who Pays the Tax" />
  </FormSection>
);
