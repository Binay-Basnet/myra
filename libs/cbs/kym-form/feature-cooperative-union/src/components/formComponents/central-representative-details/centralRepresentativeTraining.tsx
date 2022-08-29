import { useFieldArray } from 'react-hook-form';
import { AiOutlinePlus } from 'react-icons/ai';
import { CloseIcon } from '@chakra-ui/icons';

import {
  DynamicBoxContainer,
  DynamicBoxGroupContainer,
  GroupContainer,
  InputGroupContainer,
} from '@coop/cbs/kym-form/ui-containers';
import { FormInput } from '@coop/shared/form';
import { Box, Button, Icon, Text, TextFields } from '@coop/shared/ui';
import { useTranslation } from '@coop/shared/utils';

interface IAddRelatedTrainingConcern {
  index: number;
  removeRelatedTraining: () => void;
}

const AddRelatedTraining = ({
  index,
  removeRelatedTraining,
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
          name={`trainingAttended.${index}.subjectOfTraining`}
          id="centralRepresentative.trainingAttended.subjectOfTraining"
          label={t['kymCoopUnionSubjectOfTraining']}
          __placeholder={t['kymCoopUnionEnterSubjectOfTraining']}
        />
        <FormInput
          type="date"
          name={`trainingAttended.${index}.dateOfTraining`}
          id="centralRepresentative.trainingAttended.dateOfTraining"
          label={t['kymCoopUnionDateOfTraining']}
          __placeholder={t['kymCoopUnionEnterDateOfTraining']}
        />
        <FormInput
          type="text"
          name={`trainingAttended.${index}.trainingOrganization`}
          id="centralRepresentative.trainingAttended.trainingOrganization"
          label={t['kymCoopUnionTrainingOrganization']}
          __placeholder={t['kymCoopUnionEnterTrainingOrganization']}
        />
      </InputGroupContainer>
    </DynamicBoxContainer>
  );
};

export const CentralRepresentativeTraining = () => {
  const { t } = useTranslation();
  const {
    fields: relatedFields,
    append: relatedAppend,
    remove: relatedRemove,
  } = useFieldArray({
    name: `trainingAttended`,
  });

  return (
    <GroupContainer
      id="kymCoopUnionBoardOfDirectorsRelatedTraining"
      scrollMarginTop={'200px'}
    >
      <Box display="flex" flexDirection="column" gap="s4">
        <Text fontSize="r1" fontWeight="SemiBold">
          {t['kymCoopUnionTrainingRelatedToCoop']}
        </Text>
        <TextFields variant="bodyRegular">
          {t['kymCoopUnionTrainingAttended']}
        </TextFields>
      </Box>

      <div>
        <DynamicBoxGroupContainer>
          {relatedFields.map((item, index) => {
            return (
              <Box key={item.id}>
                <AddRelatedTraining
                  index={index}
                  removeRelatedTraining={() => relatedRemove(index)}
                />
              </Box>
            );
          })}
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
        </DynamicBoxGroupContainer>
      </div>
    </GroupContainer>
  );
};
