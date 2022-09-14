import { FormInput } from '@coop/shared/form';
import { Box, FormSection, Grid, GridItem, Text } from '@coop/shared/ui';
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
            <FormInput
              textAlign="right"
              name="depositAmount.minAmount"
              type="number"
              label={t['depositProductMinimumAmount']}
            />

            <FormInput
              textAlign="right"
              name="depositAmount.maxAmount"
              type="number"
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
            <FormInput
              textAlign="right"
              name="withdrawAmountLimit.minAmount"
              type="number"
              label={t['depositProductMinimumAmount']}
            />

            <FormInput
              textAlign="right"
              name="withdrawAmountLimit.maxAmount"
              type="number"
              label={t['depositProductMaximumAmount']}
            />
          </Grid>
        </BoxContainer>
      </GridItem>
    </FormSection>
  );
};
