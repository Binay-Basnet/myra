import React from 'react';
import { useFieldArray } from 'react-hook-form';
import { AiOutlineClose, AiOutlinePlus } from 'react-icons/ai';
import {
  Box,
  Button,
  Grid,
  GridItem,
  Icon,
  IconButton,
  Text,
} from '@saccos/myra/ui';

import { FormInput, FormSelect } from '../../newFormComponents';

const MainOccupation = ({ control, index, removeMainOccupation }: any) => {
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
        onClick={removeMainOccupation}
      />
      <Grid templateColumns="repeat(3, 1fr)" gap={'2em'}>
        <GridItem colSpan={1}>
          <FormSelect
            control={control}
            name={`mainOccupation[${index}].occupation`}
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
            name={`mainOccupation[${index}].orgFirmName`}
            label="Org/Frim Name"
            placeholder="Org/Firm Name"
          />
        </GridItem>

        <FormInput
          control={control}
          type="text"
          name={`mainOccupation[${index}].panVatNo`}
          label="Pan/Vat number"
          placeholder="Pan/Vat number"
        />
        <FormInput
          control={control}
          type="text"
          name={`mainOccupation[${index}].address`}
          label="Address"
          placeholder="Enter Address"
        />
        <FormInput
          control={control}
          type="number"
          name={`mainOccupation[${index}].annualIncome`}
          label="Annual Income"
          placeholder="0.00"
        />
      </Grid>
    </Box>
  );
};

export const MemberMainOccupation = ({ control }: any) => {
  const {
    fields: mainOccupationFields,
    append: mainOccupationAppend,
    remove: mainOccupationRemove,
  } = useFieldArray({ control, name: 'mainOccupation' });
  return (
    <>
      <Text fontSize="r1" fontWeight="SemiBold">
        MAIN OCCUPATION
      </Text>
      <br />
      <Box p={2} boxShadow="xs" borderRadius={5}>
        {mainOccupationFields.map((item, index) => {
          return (
            <Box key={item.id} mb={2}>
              <MainOccupation
                control={control}
                index={index}
                removeMainOccupation={() => mainOccupationRemove(index)}
              />
            </Box>
          );
        })}

        <Button
          leftIcon={<Icon size="md" as={AiOutlinePlus} />}
          variant="outline"
          mt={2}
          onClick={() => {
            mainOccupationAppend({});
          }}
        >
          Add Occupation
        </Button>
      </Box>
    </>
  );
};
