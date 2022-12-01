import { Box, FormSection, Grid, GridItem, Text } from '@myra-ui';

import { FormAmountInput } from '@coop/shared/form';
import { useTranslation } from '@coop/shared/utils';

import { BoxContainer } from '../formui';

export const TransactionLimit = () => {
  const { t } = useTranslation();

  return (
    <FormSection header="depositProductTransactionLimit">
      <GridItem colSpan={3}>
        <BoxContainer p="s16" border="1px solid" borderColor="border.layout" borderRadius="br2">
          <Box display="flex" flexDirection="column" gap="s4">
            <Text fontSize="s3" fontWeight="Medium">
              {t['depositProductDepositAmountLimit']}
            </Text>
          </Box>
          <Grid templateColumns="repeat(3,1fr)" gap="s16">
            <FormAmountInput
              type="number"
              name="depositAmount.minAmount"
              label={t['depositProductMinimumAmount']}
            />

            <FormAmountInput
              type="number"
              name="depositAmount.maxAmount"
              label={t['depositProductMaximumAmount']}
            />
          </Grid>
        </BoxContainer>
      </GridItem>

      <GridItem colSpan={3}>
        <BoxContainer p="s16" border="1px solid" borderColor="border.layout" borderRadius="br2">
          <Box display="flex" flexDirection="column" gap="s4">
            <Text fontSize="s3" fontWeight="Medium">
              {t['depositProductWithdrawAmountLimit']}
            </Text>
          </Box>
          <Grid templateColumns="repeat(3,1fr)" gap="s16">
            <FormAmountInput
              type="number"
              name="withdrawAmountLimit.minAmount"
              label={t['depositProductMinimumAmount']}
            />

            <FormAmountInput
              type="number"
              name="withdrawAmountLimit.maxAmount"
              label={t['depositProductMaximumAmount']}
            />
          </Grid>
        </BoxContainer>
      </GridItem>
    </FormSection>
  );
};
