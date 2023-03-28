import { Box, FormSection, Text } from '@myra-ui';

import { FormCOASelectModal } from '@coop/shared/form';

export const InventoryItemsLedger = () => (
  <FormSection header="Ledger Details">
    <Box display="flex" flexDirection="column" gap="s4">
      <Text fontSize="s3">Sales Ledger</Text>
      <FormCOASelectModal name="ledgers.salesLedger" />
    </Box>
    <Box display="flex" flexDirection="column" gap="s4">
      <Text fontSize="s3">Sales Return Ledger</Text>
      <FormCOASelectModal name="ledgers.salesReturnLedger" />
    </Box>
    <Box display="flex" flexDirection="column" gap="s4">
      <Text fontSize="s3">Purchase Ledger</Text>
      <FormCOASelectModal name="ledgers.purchaseLedger" />
    </Box>
    <Box display="flex" flexDirection="column" gap="s4">
      <Text fontSize="s3">Purchase Return Ledger</Text>
      <FormCOASelectModal name="ledgers.purchaseReturnLedger" />
    </Box>
  </FormSection>
);
