import { Box, FormSection } from '@myra-ui';

import { FormFileInput, FormTextArea } from '@coop/shared/form';

export const MinorNotes = () => (
  <FormSection flexLayout header="File Upload">
    <Box w="25%" pb="s32">
      <FormFileInput name="documents" label="Files" size="sm" />
    </Box>{' '}
    <FormTextArea name="notes" label="Notes" />
  </FormSection>
);
