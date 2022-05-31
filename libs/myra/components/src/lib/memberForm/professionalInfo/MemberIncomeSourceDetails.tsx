import React from 'react';
import { useFieldArray } from 'react-hook-form';
import { AiOutlineClose, AiOutlinePlus } from 'react-icons/ai';
import {
  Box,
  Button,
  Checkbox,
  Grid,
  GridItem,
  Icon,
  IconButton,
  Text,
} from '@saccos/myra/ui';

import { FormInput } from '../../newFormComponents';

const annualFamilyIncome = [
  'Upto 4 lakhs',
  '4 lakhs to 1 million',
  '1 million to 2.5 million',
  '2.5 million to 5 million',
  'More than 5 million',
];

const IncomeSource = ({ control, index, removeIncomeSource }: any) => {
  return (
    <Box
      p={4}
      display="flex"
      flexDirection="column"
      h={130}
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
        onClick={removeIncomeSource}
      />
      <Grid templateColumns="repeat(3, 1fr)" gap={'3em'}>
        <GridItem colSpan={1}>
          <FormInput
            control={control}
            type="text"
            name={`incomeSource[${index}].incomeSource`}
            label="Income Source"
            placeholder="Enter Income Source"
          />
        </GridItem>
        <GridItem colSpan={2}>
          <FormInput
            control={control}
            type="number"
            name={`incomeSource[${index}].incomeAmount`}
            label="Amout"
            placeholder="Enter Amount"
          />
        </GridItem>
      </Grid>
    </Box>
  );
};

export const MemberIncomeSourceDetails = ({ control }: any) => {
  const {
    fields: incomeSourceFields,
    append: incomeSourceAppend,
    remove: incomeSourceRemove,
  } = useFieldArray({ control, name: 'incomeSource' });
  return (
    <>
      <Text fontSize="r1" fontWeight="SemiBold">
        INCOME SOURCE DETAILS
      </Text>
      <br />
      <Box display="flex" flexDirection="column">
        <Text fontSize="s3" mb={3}>
          Annual Family Income
        </Text>
        {annualFamilyIncome.map((item) => (
          <Checkbox>
            <Text fontSize="s3">{item}</Text>
          </Checkbox>
        ))}
      </Box>
      <br />
      <Text fontSize="s3">
        Income greater than 4 lakhs in the previous fiscal year
      </Text>
      <Box p={2} boxShadow="xs" borderRadius={5}>
        {incomeSourceFields.map((item, index) => {
          return (
            <Box key={item.id} mb={2}>
              <IncomeSource
                control={control}
                removeIncomeSource={() => incomeSourceRemove(index)}
                index={index}
              />
            </Box>
          );
        })}
        <Button
          leftIcon={<Icon size="md" as={AiOutlinePlus} />}
          variant="outline"
          mt={2}
          onClick={() => incomeSourceAppend({})}
        >
          New Entry
        </Button>
      </Box>
    </>
  );
};
