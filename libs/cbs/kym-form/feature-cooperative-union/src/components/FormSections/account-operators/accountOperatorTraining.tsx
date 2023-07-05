import { useFieldArray } from 'react-hook-form';
import { AiOutlinePlus } from 'react-icons/ai';
import { CloseIcon } from '@chakra-ui/icons';

import { Box, Button, Icon, Text } from '@myra-ui';

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
  accountOperatorIndex: number;
}

const AddRelatedTraining = ({
  index,
  removeRelatedTraining,
  accountOperatorIndex,
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
          name={`accountOperators.${accountOperatorIndex}.trainingAttended.${index}.subjectOfTraining`}
          id="accountOperator.trainingAttended.subjectOfTraining"
          label={t['kymCoopUnionSubjectOfTraining']}
        />
        <FormDatePicker
          name={`accountOperators.${accountOperatorIndex}.trainingAttended.${index}.dateOfTraining`}
          id="accountOperator.trainingAttended.dateOfTraining"
          label={t['kymCoopUnionDateOfTraining']}
        />
        <FormInput
          type="text"
          name={`accountOperators.${accountOperatorIndex}.trainingAttended.${index}.trainingOrganization`}
          id="accountOperator.trainingAttended.trainingOrganization"
          label={t['kymCoopUnionTrainingOrganization']}
        />
      </InputGroupContainer>
    </DynamicBoxContainer>
  );
};

export const AccountOperatorTraining = ({
  accountOperatorIndex,
}: {
  accountOperatorIndex: number;
}) => {
  const { t } = useTranslation();
  const {
    fields: relatedFields,
    append: relatedAppend,
    remove: relatedRemove,
  } = useFieldArray({
    name: `accountOperators.${accountOperatorIndex}.trainingAttended`,
  });

  return (
    <GroupContainer id="kymCoopUnionBoardOfDirectorsRelatedTraining" scrollMarginTop="200px">
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
              accountOperatorIndex={accountOperatorIndex}
              index={index}
              removeRelatedTraining={() => relatedRemove(index)}
            />
          </Box>
        ))}
        <Button
          id="accountOperator.relatedTrainingButton"
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
