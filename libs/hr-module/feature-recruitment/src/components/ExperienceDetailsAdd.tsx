import { useFieldArray } from 'react-hook-form';
import { AiOutlinePlus } from 'react-icons/ai';

import { Box, Button, FormSection, Grid, GridItem, Icon, Text } from '@myra-ui';

import { FormDatePicker, FormInput, FormTextArea } from '@coop/shared/form';

interface IAddEducationalDetails {
  index: number;
  removeEducationalDetails: () => void;
}

const ExperienceDetails = ({ index, removeEducationalDetails }: IAddEducationalDetails) => (
  <Box bg="highlight.500" p="s20" display="flex" flexDirection="column">
    <Grid templateColumns="repeat(3,1fr)" gap="s20" rowGap="s16">
      <GridItem colSpan={2}>
        <FormInput
          type="text"
          bg="white"
          name={`experienceDetails.${index}.occupationName`}
          label="Occupation Name"
        />
      </GridItem>

      <FormInput
        type="text"
        bg="white"
        name={`experienceDetails.${index}.company`}
        label="Company"
      />
      <FormDatePicker name={`experienceDetails.${index}.fromDate`} label="From Date" />
      <FormDatePicker name={`experienceDetails.${index}.toDate`} label="To Date" />
      <FormInput
        type="text"
        bg="white"
        name={`experienceDetails.${index}.duration`}
        label="Duration"
      />
      <GridItem colSpan={3}>
        <FormTextArea name={`experienceDetails.${index}.summary`} label="Summary" />
      </GridItem>
      <GridItem colSpan={3}>
        <Button w="-webkit-fit-content" variant="outline" onClick={removeEducationalDetails}>
          Discard
        </Button>
      </GridItem>
    </Grid>
  </Box>
);

export const ExperienceDetailsAdd = () => {
  const {
    fields: educationalFields,
    append: educationalFieldsAppend,
    remove: educationalFieldsRemove,
  } = useFieldArray({ name: 'experienceDetails' });

  return (
    <FormSection header="" flexLayout>
      <Box display="flex" justifyContent="space-between" alignItems="center">
        <Text fontSize="r1" fontWeight="medium">
          Experience Details
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
            <ExperienceDetails
              index={index}
              removeEducationalDetails={() => educationalFieldsRemove(index)}
            />
          </Box>
        ))}
      </Box>
    </FormSection>
  );
};
