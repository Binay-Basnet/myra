import React from 'react';
import { useFieldArray } from 'react-hook-form';
import { AiOutlinePlus } from 'react-icons/ai';
import { CloseIcon } from '@chakra-ui/icons';

import {
  DynamicBoxContainer,
  DynamicBoxGroupContainer,
  InputGroupContainer,
} from '@coop/cbs/kym-form/ui-containers';
import { FormInput } from '@coop/shared/form';
import { Box, Button, FormSection, GridItem, Icon } from '@coop/shared/ui';
import { useTranslation } from '@coop/shared/utils';

interface IAddTraining {
  index: number;
  removeTraining: () => void;
}

const AddSister = ({ index, removeTraining }: IAddTraining) => {
  const { t } = useTranslation();
  return (
    <DynamicBoxContainer>
      <CloseIcon
        cursor="pointer"
        onClick={removeTraining}
        color="gray.500"
        _hover={{
          color: 'gray.900',
        }}
        aria-label="close"
        alignSelf="flex-end"
      />
      <InputGroupContainer>
        <FormInput
          type="text"
          name={`coopRelatedTraining.${index}.subjectOfTraining`}
          label={t['kymCoopSubjectOfTraining']}
          __placeholder={t['kymCoopEnterSubjectOfTraining']}
        />
        <FormInput
          type="date"
          name={`coopRelatedTraining.${index}.dateOfTraining`}
          label={t['kymCoopDateOfTraining']}
          __placeholder={t['kymCoopEnterDateOfTraining']}
        />
        <FormInput
          type="text"
          name={`coopRelatedTraining.${index}.trainingOrganization`}
          label={t['kymCoopTrainingOrganization']}
          __placeholder={t['kymCoopEnterTrainingOrganization']}
        />
      </InputGroupContainer>
    </DynamicBoxContainer>
  );
};

export const DynamicAddtraining = () => {
  const { t } = useTranslation();
  const {
    fields: trainingFields,
    append: trainingAppend,
    remove: trainingRemove,
  } = useFieldArray({ name: 'coopRelatedTraining' });

  return (
    <FormSection
      gridLayout={true}
      header="kymCoopTrainingRelatedToCoop"
      subHeader="kymCoopTrainingRelatedToCoopsubText"
    >
      <GridItem colSpan={3}>
        <DynamicBoxGroupContainer>
          {trainingFields.map((item, index) => {
            return (
              <Box key={item.id}>
                <AddSister
                  index={index}
                  removeTraining={() => trainingRemove(index)}
                />
              </Box>
            );
          })}
          <Button
            id="accountOperatorButton"
            alignSelf="start"
            leftIcon={<Icon size="md" as={AiOutlinePlus} />}
            variant="outline"
            onClick={() => {
              trainingAppend({});
            }}
          >
            {t['kymInsNewDetail']}
          </Button>
        </DynamicBoxGroupContainer>
      </GridItem>
    </FormSection>
  );
};
