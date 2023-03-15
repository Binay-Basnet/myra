import { Box, Grid, Text } from '@myra-ui';

import { FormInput } from '@coop/shared/form';
import { useTranslation } from '@coop/shared/utils';

export const DepositSaving = () => {
  const { t } = useTranslation();

  return (
    <Box p="s16" border="1px solid" borderColor="border.layout" borderRadius="br2">
      <Grid templateColumns="repeat(2,1fr)" gap="s16">
        <FormInput
          name="deposit.minValue"
          label={t['loanProductMinimumValue']}
          textAlign="right"
          rightElement={
            <Text fontWeight="Medium" fontSize="r1" color="primary.500">
              %
            </Text>
          }
          type="number"
        />
        <FormInput
          name="deposit.maxValue"
          label={t['loanProductMaximumValue']}
          textAlign="right"
          rightElement={
            <Text fontWeight="Medium" fontSize="r1" color="primary.500">
              %
            </Text>
          }
          type="number"
        />
      </Grid>
    </Box>
  );
};
