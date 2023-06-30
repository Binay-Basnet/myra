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
}

const AddRelatedTraining = ({ index, removeRelatedTraining }: IAddRelatedTrainingConcern) => {
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
          name={`centralRepresentative.trainingAttended.${index}.subjectOfTraining`}
          id="centralRepresentative.trainingAttended.subjectOfTraining"
          label={t['kymCoopUnionSubjectOfTraining']}
        />
        <FormDatePicker
          name={`centralRepresentative.trainingAttended.${index}.dateOfTraining`}
          id="centralRepresentative.trainingAttended.dateOfTraining"
          label={t['kymCoopUnionDateOfTraining']}
        />
        <FormInput
          type="text"
          name={`centralRepresentative.trainingAttended.${index}.trainingOrganization`}
          id="centralRepresentative.trainingAttended.trainingOrganization"
          label={t['kymCoopUnionTrainingOrganization']}
        />
      </InputGroupContainer>
    </DynamicBoxContainer>
  );
};

export const CentralRepresentativeTraining = () => {
  const { t } = useTranslation();

  const { control } = useFormContext<CoopUnionInstitutionInformationInput>();

  const {
    fields: relatedFields,
    append: relatedAppend,
    remove: relatedRemove,
  } = useFieldArray({
    name: `centralRepresentative.trainingAttended`,
    control,
  });

  return (
    <GroupContainer id="kymCoopUnionBoardOfDirectorsRelatedTraining" scrollMarginTop="200px">
      <Box display="flex" flexDirection="column" gap="s4">
        <Text fontSize="r1" fontWeight="SemiBold">
          {t['kymCoopUnionTrainingRelatedToCoop']}
        </Text>
        <Text variant="bodyRegular">{t['kymCoopUnionTrainingAttended']}</Text>
      </Box>

      <Box display="flex" flexDirection="column" gap="s20">
        {relatedFields.map((item, index) => (
          <Box key={item.id}>
            <AddRelatedTraining index={index} removeRelatedTraining={() => relatedRemove(index)} />
          </Box>
        ))}
        <Button
          alignSelf="start"
          leftIcon={<Icon size="md" as={AiOutlinePlus} />}
          variant="outline"
          onClick={() => {
            relatedAppend({});
          }}
          id="centralRepresentative.relatedTrainingButton"
        >
          {t['kymInsNewDetail']}
        </Button>
      </Box>
    </GroupContainer>
  );
};
