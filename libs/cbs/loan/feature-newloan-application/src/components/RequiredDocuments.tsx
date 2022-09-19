import { FormFileInput } from '@coop/shared/form';
import { Box, Grid, Text } from '@coop/shared/ui';

export const RequiredDocuments = () => (
  <Box display="flex" flexDirection="column" gap="s16">
    <Text fontWeight="600" fontSize="r1">
      Required Documents
    </Text>
    <Grid templateColumns="repeat(2,1fr)" gap="s20">
      <FormFileInput name="photoDoc" label="Photo" size="lg" />
      <FormFileInput name="signatureDoc" label="Signature" size="lg" />
      <FormFileInput name="nomineeDoc" label="Nominee Document" size="lg" />
      <FormFileInput name="fingerprintDoc" label="FingerPrint Photo" size="lg" />
    </Grid>
  </Box>
);
