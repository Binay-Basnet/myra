import { useFieldArray, useFormContext } from 'react-hook-form';
import { AiOutlinePlus } from 'react-icons/ai';
import { CloseIcon } from '@chakra-ui/icons';

import { Box, Button, Icon, Text } from '@myra-ui';

import { CoopUnionInstitutionInformationInput } from '@coop/cbs/data-access';
import {
  DynamicBoxContainer,
  GroupContainer,
  InputGroupContainer,
} from '@coop/cbs/kym-form/ui-containers';
import { FormDatePicker, FormInput } from '@coop/shared/form';
import { useTranslation } from '@coop/shared/utils';

interface IAddRelatedTrainingConcern {
  index: number;
  removeRelatedTraining: () => void;
  directorIndex: number;
}

const AddRelatedTraining = ({
  index,
  removeRelatedTraining,
  directorIndex,
}: IAddRelatedTrainingConcern) => {
  const { t } = useTranslation();
  return (
    <DynamicBoxContainer>
      <CloseIcon
        cursor="pointer"
        onClick={removeRelatedTraining}
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
          name={`directors.${directorIndex}.trainingAttended.${index}.subjectOfTraining`}
          id="boardOfDirectors.trainingAttended.subjectOfTraining"
          label={t['kymCoopUnionSubjectOfTraining']}
        />
        <FormDatePicker
          name={`directors.${directorIndex}.trainingAttended.${index}.dateOfTraining`}
          id="boardOfDirectors.trainingAttended.dateOfTraining"
          label={t['kymCoopUnionDateOfTraining']}
        />
        <FormInput
          type="text"
          name={`directors.${directorIndex}.trainingAttended.${index}.trainingOrganization`}
          id="boardOfDirectors.trainingAttended.trainingOrganization"
          label={t['kymCoopUnionTrainingOrganization']}
        />
      </InputGroupContainer>
    </DynamicBoxContainer>
  );
};

export const BoardOfDirectorRelatedTraining = ({ directorIndex }: { directorIndex: number }) => {
  const { t } = useTranslation();

  const { control } = useFormContext<CoopUnionInstitutionInformationInput>();

  const {
    fields: relatedFields,
    append: relatedAppend,
    remove: relatedRemove,
  } = useFieldArray({
    name: `directors.${directorIndex}.trainingAttended`,
    control,
  });

  return (
    <GroupContainer
      id="kymCoopUnionBoardOfDirectorsRelatedTraining"
      scrollMarginTop="200px"
      p="s16"
      borderBottom="1px solid"
      borderBottomColor="border.layout"
    >
      <Box display="flex" flexDirection="column" gap="s4">
        <Text fontSize="r1" fontWeight="SemiBold">
          {t['kymCoopUnionTrainingRelatedToCoop']}
        </Text>
        <Text variant="bodyRegular">{t['kymCoopUnionTrainingAttended']}</Text>
      </Box>

      <Box display="flex" flexDirection="column" gap="s16">
        {relatedFields.map((item, index) => (
          <Box key={item.id}>
            <AddRelatedTraining
              index={index}
              directorIndex={directorIndex}
              removeRelatedTraining={() => relatedRemove(index)}
            />
          </Box>
        ))}
        <Button
          id="boardOfDirectorRelatedTrainig"
          alignSelf="start"
          leftIcon={<Icon size="md" as={AiOutlinePlus} />}
          variant="outline"
          onClick={() => {
            relatedAppend({});
          }}
        >
          {t['kymInsNewDetail']}
        </Button>
      </Box>
    </GroupContainer>
  );
};
