import { Box, FormSection } from '@myra-ui';

import { FormFileInput, FormTextArea } from '@coop/shared/form';

export const SavingNotes = () => (
  <FormSection flexLayout header="File Upload">
    <Box w="25%" pb="s32">
      <FormFileInput name="files" label="Files" size="sm" />
    </Box>{' '}
    <FormTextArea name="notes" label="Notes" noOfLines={4} />
  </FormSection>
);
