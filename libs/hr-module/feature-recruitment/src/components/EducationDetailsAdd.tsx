import { useFieldArray } from 'react-hook-form';
import { AiOutlinePlus } from 'react-icons/ai';

import { Box, Button, FormSection, Grid, GridItem, Icon, Text } from '@myra-ui';

import { Frequency } from '@coop/cbs/data-access';
import { FormDatePicker, FormInput, FormSelect } from '@coop/shared/form';

interface IAddEducationalDetails {
  index: number;
  removeEducationalDetails: () => void;
}

const EducationalDetails = ({ index, removeEducationalDetails }: IAddEducationalDetails) => (
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
        options={[
          {
            label: 'daily',
            value: Frequency.Daily,
          },
          {
            label: 'weekly',
            value: Frequency.Weekly,
          },
          {
            label: 'monthly',
            value: Frequency.Monthly,
          },
          {
            label: 'yearly',
            value: Frequency.Yearly,
          },
        ]}
      />
      <FormInput
        type="text"
        bg="white"
        name={`educationalDetails.${index}.specialization`}
        label="Specialization"
      />
      <FormDatePicker
        name={`educationalDetails.${index}.dateOfCompletion`}
        label="Date of Completion"
      />
      <GridItem colSpan={3}>
        <Button w="-webkit-fit-content" variant="outline" onClick={removeEducationalDetails}>
          Discard
        </Button>
      </GridItem>
    </Grid>
  </Box>
);

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
