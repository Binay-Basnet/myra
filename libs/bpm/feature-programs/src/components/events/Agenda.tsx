import { Box, FormSection } from '@myra-ui';

import { FormFileInput, FormTextArea } from '@coop/shared/form';

export const EventsNotes = () => (
  <FormSection flexLayout>
    <Box w="25%" pb="s32">
      <FormFileInput name="files" label="File Upload" size="sm" />
    </Box>{' '}
    <FormTextArea name="notes" label="Notes" />
  </FormSection>
);
