import { useRouter } from 'next/router';

import { FormSection, Text } from '@myra-ui';

import { FormCOALedgerSelect, FormLeafCoaHeadSelect, FormNumberInput } from '@coop/shared/form';

export const ShareDistribution = () => {
  const router = useRouter();

  return (
    <FormSection header="Share Distribution">
      {/* <GridItem colSpan={2}> */}
      <FormCOALedgerSelect
        name="sourceLedgerID"
        label="Source COA Ledger"
        currentBranchOnly
        isDisabled={router?.asPath?.includes('/view')}
      />

      <FormLeafCoaHeadSelect
        name="taxLedgerCOAHead"
        label="Tax COA Head"
        isDisabled={router?.asPath?.includes('/view')}
      />
      {/* </GridItem> */}

      <FormNumberInput
        name="taxRate"
        label="Tax Rate"
        rightElement={
          <Text fontWeight="Medium" fontSize="r1" color="primary.500">
            %
          </Text>
        }
        isDisabled={router?.asPath?.includes('/view')}
      />
      <FormNumberInput
        name="dividendRate"
        label="Dividend Rate"
        rightElement={
          <Text fontWeight="Medium" fontSize="r1" color="primary.500">
            %
          </Text>
        }
        isDisabled={router?.asPath?.includes('/view')}
      />
      {/* 
    <GridItem colSpan={2}>
      <FormSelect name="accountMapping" label="Account Mapping" />
    </GridItem>

    <FormSelect name="whoPaysTax" label="Who Pays the Tax" /> */}
    </FormSection>
  );
};
