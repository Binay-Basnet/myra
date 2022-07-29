import React from 'react';
import { useFieldArray } from 'react-hook-form';
import { FormProvider, useForm } from 'react-hook-form';
import { AiOutlinePlus } from 'react-icons/ai';
import { AiOutlineDelete } from 'react-icons/ai';
import { GrRotateRight } from 'react-icons/gr';

import { GroupContainer } from '@coop/cbs/kym-form/ui-containers';
import { KymCooperativeFormInput } from '@coop/shared/data-access';
import { Box, Button, Icon, Text } from '@coop/shared/ui';
import { getKymCoopSection, useTranslation } from '@coop/shared/utils';

import { AddDirector } from '../../accordion-component/KymCoopDirectorAccordion';
import { useCooperative } from '../../hooks/customCooperative';

interface IProps {
  setSection: (section?: { section: string; subSection: string }) => void;
}
export const KymCoopBoardDirectorDetail = (props: IProps) => {
  const { t } = useTranslation();
  const { setSection } = props;
  const methods = useForm<KymCooperativeFormInput>({
    defaultValues: {},
  });
  const { control, watch } = methods;
  const {
    fields: directorFields,
    append: directorAppend,
    remove: directorRemove,
  } = useFieldArray({ control, name: 'boardOfDirectorsDetails' });

  useCooperative({ methods });
  return (
    <FormProvider {...methods}>
      <form
        onFocus={(e) => {
          const kymSection = getKymCoopSection(e.target.id);
          setSection(kymSection);
        }}
      >
        <GroupContainer
          id="kymCoopAccBoardOfDirectorDetails"
          scrollMarginTop={'200px'}
        >
          <Text fontSize="r1" fontWeight="SemiBold">
            {t['kymCoopBoardofdirectordetails']}
          </Text>
          {directorFields.map((item, index) => {
            return (
              <Box key={item.id} display="flex" flexDirection={'column'}>
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
      </form>
    </FormProvider>
  );
};
