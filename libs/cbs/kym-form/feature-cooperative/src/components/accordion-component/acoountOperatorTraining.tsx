import React from 'react';
import { Control, useFieldArray } from 'react-hook-form';
import { AiOutlinePlus } from 'react-icons/ai';
import { CloseIcon } from '@chakra-ui/icons';

import {
  DynamicBoxContainer,
  DynamicBoxGroupContainer,
  GroupContainer,
  InputGroupContainer,
} from '@coop/cbs/kym-form/ui-containers';
import { FormInput, FormSelect } from '@coop/shared/form';
// import { KymIndMemberInput } from '@coop/shared/data-access';
import { Box, Button, Grid, Icon, Text } from '@coop/shared/ui';
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
          name={`accountOperatorsDetails.${index}.subjectOfTraining.${index}`}
          label={t['kymCoopSubjectOfTraining']}
          placeholder={t['kymCoopEnterSubjectOfTraining']}
        />
        <FormInput
          type="date"
          name={`accountOperatorsDetails.${index}.dateOfTraining.${index}`}
          label={t['kymCoopDateOfTraining']}
          placeholder={t['kymCoopEnterDateOfTraining']}
        />
        <FormInput
          type="number"
          name={`accountOperatorsDetails.${index}.trainingOrganization.${index}`}
          label={t['kymCoopTrainingOrganization']}
          placeholder={t['kymCoopEnterTrainingOrganization']}
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
  } = useFieldArray({ name: 'accountOperatorsDetails' });

  return (
    <GroupContainer>
      <Box display={'flex'} flexDirection="column" gap="s4">
        <Text fontSize="r1" fontWeight="SemiBold">
          {t['kymCoopTrainingRelatedToCoop']}
        </Text>
        <Text fontSize="s2" fontWeight="400">
          {t['kymCoopTrainingRelatedToCoopsubText']}
        </Text>
      </Box>
      <div>
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
      </div>
    </GroupContainer>
  );
};
