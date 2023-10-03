import { useFieldArray } from 'react-hook-form';
import { AiOutlinePlus } from 'react-icons/ai';
import { IoClose } from 'react-icons/io5';

import { Box, Button, FormSection, Grid, GridItem, Icon, IconButton } from '@myra-ui';

import {
  FormFieldSearchTerm,
  GetIndividualKymOptionsQuery,
  GradeLevels,
  useGetIndividualKymOptionsQuery,
} from '@coop/cbs/data-access';
import { FormDatePicker, FormInput, FormSelect } from '@coop/shared/form';

interface IAddEducationalDetails {
  index: number;
  removeEducationalDetails: () => void;
}

export const getFieldOption = (
  data?: GetIndividualKymOptionsQuery,
  labelFormatter?: (label: string) => string
) =>
  data?.form?.options?.predefined?.data?.reduce((newArr, option) => {
    if (option?.name.local && option?.id) {
      newArr.push({
        label: labelFormatter ? labelFormatter(option.name.local) : option.name.local,
        value: option.id,
      });
    }

    return newArr;
  }, [] as { label: string; value: string }[]);

const AddEducationalDetails = ({ index, removeEducationalDetails }: IAddEducationalDetails) => {
  const { data: educationFields, isLoading: educationLoading } = useGetIndividualKymOptionsQuery({
    searchTerm: FormFieldSearchTerm.EducationQualification,
  });
  const gradeOptions = [
    { label: 'Distinction', value: GradeLevels?.Distinction },
    { label: 'First Division', value: GradeLevels?.FirstDivision },
    { label: 'Second Division', value: GradeLevels?.SecondDivision },
    { label: 'Third Division', value: GradeLevels?.ThirdDivision },
  ];

  return (
    <Box bg="highlight.500" p="s20" display="flex" flexDirection="column">
      <IconButton
        aria-label="close-icon"
        icon={<Icon as={IoClose} />}
        onClick={removeEducationalDetails}
        variant="ghost"
        size="lg"
        justifySelf="flex-end"
        alignSelf="flex-end"
      />
      <Grid templateColumns="repeat(3,1fr)" gap="s20" rowGap="s16">
        <GridItem colSpan={2}>
          <FormInput
            type="text"
            bg="white"
            name={`educationDetails.${index}.instituteName`}
            label="Institute Name"
          />
        </GridItem>
        <FormSelect
          name={`educationDetails.${index}.degree_diploma`}
          label="Degree/Diploma"
          isLoading={educationLoading}
          options={getFieldOption(educationFields)}
        />
        <FormInput name={`educationDetails.${index}.durationInYrs`} label="Duration in years" />
        <FormSelect name={`educationDetails.${index}.grade`} label="Grade" options={gradeOptions} />
        <FormDatePicker
          name={`educationDetails.${index}.dateOfCompletion`}
          label="Date of completion"
        />
      </Grid>
    </Box>
  );
};

export const EducationalDetails = () => {
  const {
    fields: educationalFields,
    append: educationalFieldsAppend,
    remove: educationalFieldsRemove,
  } = useFieldArray({ name: 'educationDetails' });

  return (
    <FormSection header="Educational Information" flexLayout id="Educational Information">
      {educationalFields.map((item, index) => (
        <Box key={item.id} py="s4">
          <AddEducationalDetails
            index={index}
            removeEducationalDetails={() => educationalFieldsRemove(index)}
          />
        </Box>
      ))}
      <Button
        alignSelf="start"
        leftIcon={<Icon size="md" as={AiOutlinePlus} />}
        variant="outline"
        onClick={() => {
          educationalFieldsAppend({});
        }}
      >
        Add Education Detail{' '}
      </Button>
    </FormSection>
  );
};
