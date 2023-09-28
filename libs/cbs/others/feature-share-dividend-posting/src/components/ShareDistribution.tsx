import { FormSection, Text } from '@myra-ui';

import { FormCOALedgerSelect, FormLeafCoaHeadSelect, FormNumberInput } from '@coop/shared/form';

export const ShareDistribution = () => (
  <FormSection header="Share Distribution">
    {/* <GridItem colSpan={2}> */}
    <FormCOALedgerSelect name="sourceLedgerID" label="Source COA Ledger" currentBranchOnly />

    <FormLeafCoaHeadSelect name="taxLedgerCOAHead" label="Tax Rate COA Head" />
    {/* </GridItem> */}

    <FormNumberInput
      name="taxRate"
      label="Tax Rate"
      rightElement={
        <Text fontWeight="Medium" fontSize="r1" color="primary.500">
          %
        </Text>
      }
    />
    <FormNumberInput
      name="dividendRate"
      label="Dividend Rate"
      rightElement={
        <Text fontWeight="Medium" fontSize="r1" color="primary.500">
          %
        </Text>
      }
    />
    {/* 
    <GridItem colSpan={2}>
      <FormSelect name="accountMapping" label="Account Mapping" />
    </GridItem>

    <FormSelect name="whoPaysTax" label="Who Pays the Tax" /> */}
  </FormSection>
);
