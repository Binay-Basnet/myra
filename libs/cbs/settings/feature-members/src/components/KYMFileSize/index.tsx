import React from 'react';
import { debounce } from 'lodash';

import {
  FormSection,
  FormSectionType,
  useAddFileSizeToSectionMutation,
} from '@coop/cbs/data-access';
import { AccordionPanel, Box, Text, TextInput } from '@coop/shared/ui';

interface FileSizeInputProps {
  section: FormSection;
}

export const KYMFileSize = ({ section }: FileSizeInputProps) => {
  const { mutateAsync: addFileSize } = useAddFileSizeToSectionMutation();

  if (section?.sectionType !== FormSectionType.Upload) {
    return null;
  }

  return (
    <AccordionPanel p="0" borderTop={'1px'} borderTopColor={'border.layout'}>
      <Box
        display="flex"
        alignItems={'center'}
        justifyContent="space-between"
        p="s16"
      >
        <Box>
          <Text fontSize="r1" color="gray.800" mb="s4">
            Max File Upload Size (in KB)
          </Text>
          <TextInput
            defaultValue={section?.maxSize ?? undefined}
            onChange={debounce(async (e) => {
              await addFileSize({
                sectionId: section.id,
                maxSize: +e.target.value,
              });
            }, 800)}
            __placeholder="File Size"
          />
        </Box>
      </Box>
    </AccordionPanel>
  );
};
