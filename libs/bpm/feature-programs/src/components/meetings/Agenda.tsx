import { Box, FormSection } from '@myra-ui';

import { FormFileInput, FormTextArea } from '@coop/shared/form';

export const MeetingsAgenda = () => (
  <FormSection flexLayout>
    <FormTextArea name="agenda" label="Agenda" />
    <Box w="25%" pt="s32">
      {' '}
      <FormFileInput name="files" label="File Upload" size="sm" />
    </Box>
  </FormSection>
);
