import { Box, Grid } from '@myra-ui';

import { FormAmountInput, FormFileInput } from '@coop/shared/form';

export const Discount = () => (
  <Box display="flex" flexDirection="column" gap="s16" p="s16" backgroundColor="highlight.500">
    <Grid templateColumns="repeat(2, 1fr)" gap="s16">
      <FormAmountInput name="penalty.amount" label="Payable Fine" />

      <FormFileInput name="penalty.doc" label="File Upload" size="sm" />
    </Grid>
  </Box>
);
