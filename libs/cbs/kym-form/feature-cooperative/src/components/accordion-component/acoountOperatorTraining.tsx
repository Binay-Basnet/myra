import { useFieldArray, useFormContext } from 'react-hook-form';
import { AiOutlinePlus } from 'react-icons/ai';
import { CloseIcon } from '@chakra-ui/icons';

import { Box, Button, FormSection, GridItem, Icon } from '@myra-ui';

import { KymCooperativeFormInput } from '@coop/cbs/data-access';
import { DynamicBoxContainer, InputGroupContainer } from '@coop/cbs/kym-form/ui-containers';
import { FormDatePicker, FormInput } from '@coop/shared/form';
import { useTranslation } from '@coop/shared/utils';

interface IAddTraining {
  index: number;
  parentIndex: number;
  removeTraining: () => void;
}

const AddSister = ({ index, parentIndex, removeTraining }: IAddTraining) => {
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
          name={`accountOperator.${parentIndex}.coopRelatedTraining.${index}.subjectOfTraining`}
          label={t['kymCoopSubjectOfTraining']}
        />
        <FormDatePicker
          name={`accountOperator.${parentIndex}.coopRelatedTraining.${index}.dateOfTraining`}
          label={t['kymCoopDateOfTraining']}
        />
        <FormInput
          type="text"
          name={`accountOperator.${parentIndex}.coopRelatedTraining.${index}.trainingOrganization`}
          label={t['kymCoopTrainingOrganization']}
        />
      </InputGroupContainer>
    </DynamicBoxContainer>
  );
};

interface DynamicAddtrainingProps {
  index: number;
}

export const DynamicAddtraining = ({ index: parentIndex }: DynamicAddtrainingProps) => {
  const { t } = useTranslation();
  const { control } = useFormContext<KymCooperativeFormInput>();

  const {
    fields: trainingFields,
    append: trainingAppend,
    remove: trainingRemove,
  } = useFieldArray({ name: `accountOperator.${parentIndex}.coopRelatedTraining`, control });

  return (
    <FormSection
      header="kymCoopTrainingRelatedToCoop"
      subHeader="kymCoopTrainingRelatedToCoopsubText"
    >
      <GridItem colSpan={3} display="flex" flexDir="column" gap="s16">
        {trainingFields.map((item, index) => (
          <Box key={item.id}>
            <AddSister
              parentIndex={parentIndex}
              index={index}
              removeTraining={() => trainingRemove(index)}
            />
          </Box>
        ))}
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
      </GridItem>
    </FormSection>
  );
};
