import { useFieldArray } from 'react-hook-form';
import { AiOutlinePlus } from 'react-icons/ai';

import { Box, Button, FormSection, Grid, GridItem, Icon, Text } from '@myra-ui';

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

const EducationalDetails = ({ index, removeEducationalDetails }: IAddEducationalDetails) => {
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
      <Grid templateColumns="repeat(3,1fr)" gap="s20" rowGap="s16">
        <GridItem colSpan={2}>
          <FormInput
            type="text"
            bg="white"
            name={`educationalDetails.${index}.instituteName`}
            label="Institute Name"
          />
        </GridItem>

        <FormSelect
          name={`educationalDetails.${index}.degree_diploma`}
          label="Degree/Diploma"
          isLoading={educationLoading}
          options={getFieldOption(educationFields)}
        />
        <FormInput name={`educationalDetails.${index}.durationInYrs`} label="Duration in years" />
        <FormSelect
          name={`educationalDetails.${index}.grade`}
          label="Grade"
          options={gradeOptions}
        />
        <FormDatePicker
          name={`educationalDetails.${index}.dateOfCompletion`}
          label="Date of completion"
        />
        <GridItem colSpan={3}>
          <Button w="-webkit-fit-content" variant="outline" onClick={removeEducationalDetails}>
            Discard
          </Button>
        </GridItem>
      </Grid>
    </Box>
  );
};

export const EducationalDetailsAdd = () => {
  const {
    fields: educationalFields,
    append: educationalFieldsAppend,
    remove: educationalFieldsRemove,
  } = useFieldArray({ name: 'educationalDetails' });

  return (
    <FormSection header="" flexLayout>
      <Box display="flex" justifyContent="space-between" alignItems="center">
        <Text fontSize="r1" fontWeight="medium">
          Education Details
        </Text>
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
      </Box>
      <Box display="flex" flexDir="column" mt="s16">
        {educationalFields.map((item, index) => (
          <Box key={item.id} py="s4">
            <EducationalDetails
              index={index}
              removeEducationalDetails={() => educationalFieldsRemove(index)}
            />
          </Box>
        ))}
      </Box>
    </FormSection>
  );
};
