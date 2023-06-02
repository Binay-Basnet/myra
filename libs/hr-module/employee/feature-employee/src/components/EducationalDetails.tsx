import { useFieldArray } from 'react-hook-form';
import { AiOutlinePlus } from 'react-icons/ai';
import { IoClose } from 'react-icons/io5';

import { Box, Button, FormSection, Grid, GridItem, Icon, IconButton } from '@myra-ui';

import { Frequency } from '@coop/cbs/data-access';
import { FormDatePicker, FormInput, FormSelect } from '@coop/shared/form';

interface IAddEducationalDetails {
  index: number;
  removeEducationalDetails: () => void;
}

const AddEducationalDetails = ({ index, removeEducationalDetails }: IAddEducationalDetails) => (
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
    </Grid>
  </Box>
);

export const EducationalDetails = () => {
  const {
    fields: educationalFields,
    append: educationalFieldsAppend,
    remove: educationalFieldsRemove,
  } = useFieldArray({ name: 'insuranceScheme' });

  return (
    <FormSection header="Education Information" flexLayout id="Education Information">
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
