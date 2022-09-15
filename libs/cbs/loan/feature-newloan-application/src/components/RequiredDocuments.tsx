import { FormFileInput } from '@coop/shared/form';
import { Box, Grid, Text } from '@coop/shared/ui';

export const RequiredDocuments = () => (
  <Box display="flex" flexDirection="column" gap="s16">
    <Text fontWeight="600" fontSize="r1">
      Required Documents
    </Text>
    <Grid templateColumns="repeat(2,1fr)" gap="s20">
      <FormFileInput name="Photo" label="Photo" size="lg" />
      <FormFileInput name="Signature" label="Signature" size="lg" />
      <FormFileInput name="NomineeDocument" label="Nominee Document" size="lg" />
      <FormFileInput name="FingerprintPhoto" label="FingerPrint Photo" size="lg" />
    </Grid>
  </Box>
);
