import React from 'react';
import { useFieldArray } from 'react-hook-form';
import { AiOutlineClose, AiOutlinePlus } from 'react-icons/ai';
import { FormInput, FormSelect } from '@saccos/myra/components';
import {
  Box,
  Button,
  Grid,
  GridItem,
  Icon,
  IconButton,
  Text,
} from '@saccos/myra/ui';

const HushbandWifeOccupation = ({
  control,
  index,
  removeHushbandWifeOccupation,
}) => {
  return (
    <Box
      p={4}
      display="flex"
      flexDirection="column"
      h={220}
      bg="gray.100"
      borderRadius={5}
    >
      <IconButton
        alignSelf="flex-end"
        variant="ghost"
        colorScheme="teal"
        aria-label="close"
        size="md"
        icon={<Icon size="md" as={AiOutlineClose} />}
        onClick={removeHushbandWifeOccupation}
      />
      <Grid templateColumns="repeat(3, 1fr)" gap={'2em'}>
        <GridItem colSpan={1}>
          <FormSelect
            control={control}
            name={`spouceOccupation[${index}].occupation`}
            label="Occupation"
            placeholder="Select Occupation"
            options={[
              { label: 'Agriculture', value: 'agriculature' },
              { label: 'Student', value: 'student' },
            ]}
          />
        </GridItem>
        <GridItem colSpan={2}>
          <FormInput
            control={control}
            type="text"
            name={`spouceOccupation[${index}].orgName`}
            label="Org/Frim Name"
            placeholder="Org/Firm Name"
          />
        </GridItem>

        <FormInput
          control={control}
          type="text"
          name={`spouceOccupation[${index}].idNumber`}
          label="Pan/Vat number"
          placeholder="Pan/Vat number"
        />
        <FormInput
          control={control}
          type="text"
          name={`spouceOccupation[${index}].address`}
          label="Address"
          placeholder="Enter Address"
        />
        <FormInput
          control={control}
          type="number"
          name={`spouceOccupation[${index}].estimatedAnnualIncome`}
          label="Annual Income"
          placeholder="0.00"
        />
      </Grid>
    </Box>
  );
};

export const MemberHushbandWifeOccupation = ({ control }) => {
  const {
    fields: hushbandWifeOccupationFields,
    append: hushbandWifeOccupationAppend,
    remove: hushbandWifeOccupationRemove,
  } = useFieldArray({ control, name: 'mainOccupation' });

  return (
    <>
      <Text fontSize="r1" fontWeight="SemiBold">
        MAIN OCCUPATION OF HUSHBAND/WIFE
      </Text>
      <br />
      <Box p={2} boxShadow="xs" borderRadius={5}>
        {hushbandWifeOccupationFields.map((item, index) => {
          return (
            <Box key={item.id} mb={2}>
              <HushbandWifeOccupation
                control={control}
                index={index}
                removeHushbandWifeOccupation={() =>
                  hushbandWifeOccupationRemove(index)
                }
              />
            </Box>
          );
        })}

        <Button
          leftIcon={<Icon size="md" as={AiOutlinePlus} />}
          variant="outline"
          mt={2}
          onClick={() => {
            hushbandWifeOccupationAppend({});
          }}
        >
          Add Occupation
        </Button>
      </Box>
    </>
  );
};
