import React from 'react';
import { useFieldArray } from 'react-hook-form';
import { useFormContext } from 'react-hook-form';
import { AiOutlinePlus } from 'react-icons/ai';
import { AiOutlineDelete } from 'react-icons/ai';
import { GrRotateRight } from 'react-icons/gr';

import { GroupContainer } from '@coop/cbs/kym-form/ui-containers';
import { Box, Button, Icon, Text } from '@coop/shared/ui';
import { useTranslation } from '@coop/shared/utils';

import { AddDirector } from '../../accordion-component/KymCoopDirectorAccordion';

export const KymCoopBoardDirectorDetail = ({ watch, control }) => {
  const { t } = useTranslation();
  const {
    fields: directorFields,
    append: directorAppend,
    remove: directorRemove,
  } = useFieldArray({ control, name: 'boardOfDirectorsDetails' });
  return (
    <GroupContainer
      id="kymCoopAccBoardOfDirectorDetails"
      scrollMarginTop={'200px'}
    >
      <Text fontSize="r1" fontWeight="SemiBold">
        {t['kymCoopBoardofdirectordetails']}
      </Text>
      {directorFields.map((item, index) => {
        return (
          <Box key={item.id} display="flex" flexDirection={'column'} gap="s16">
            <AddDirector
              watch={watch}
              index={index}
              control={control}
              removeDirector={() => directorRemove(index)}
            />
          </Box>
        );
      })}
      <Button
        id="directorButton"
        alignSelf="start"
        leftIcon={<Icon size="md" as={AiOutlinePlus} />}
        variant="outline"
        onClick={() => {
          directorAppend({});
        }}
      >
        {t['kymCoopAddDirector']}
      </Button>
    </GroupContainer>
  );
};
