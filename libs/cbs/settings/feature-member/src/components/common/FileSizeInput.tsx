import React from 'react';
import { debounce } from 'lodash';

import { useAddFileSizeMutation } from '@coop/shared/data-access';
import { AccordionPanel, Box, Text, TextInput } from '@coop/shared/ui';

import { KymField, KymFieldType } from '../../types';

interface FileSizeInputProps {
  field: KymField;
}

export const FileSizeInput = ({ field }: FileSizeInputProps) => {
  const { mutateAsync: addFileSize } = useAddFileSizeMutation();

  if (field?.fieldType !== KymFieldType.Upload) {
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
            defaultValue={field?.maxSize ?? undefined}
            onChange={debounce(async (e) => {
              await addFileSize({
                fieldId: field.id,
                maxSize: +e.target.value,
              });
            }, 800)}
            placeholder="File Size"
          />
        </Box>
      </Box>
    </AccordionPanel>
  );
};
