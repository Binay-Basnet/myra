import React from 'react';
import { useFieldArray } from 'react-hook-form';
import { AiOutlinePlus } from 'react-icons/ai';
import { CloseIcon } from '@chakra-ui/icons';
import { Box, Button, Checkbox, GridItem, Icon, Text } from '@saccos/myra/ui';

import {
  DynamicBoxContainer,
  DynamicBoxGroupContainer,
  GroupContainer,
  InputGroupContainer,
} from '../containers';
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
    <DynamicBoxContainer>
      <CloseIcon
        cursor="pointer"
        onClick={removeIncomeSource}
        color="gray.500"
        _hover={{
          color: 'gray.900',
        }}
        aria-label="close"
        alignSelf="flex-end"
      />

      <InputGroupContainer>
        <GridItem colSpan={1}>
          <FormInput
            control={control}
            type="text"
            bg="white"
            name={`incomeSourceDetails.${index}.source`}
            label="Income Source"
            placeholder="Enter Income Source"
          />
        </GridItem>
        <GridItem colSpan={2}>
          <FormInput
            control={control}
            type="number"
            bg="white"
            name={`incomeSourceDetails.${index}.amount`}
            label="Amount"
            placeholder="Enter Amount"
          />
        </GridItem>
      </InputGroupContainer>
    </DynamicBoxContainer>
  );
};

export const MemberKYMIncomeSourceDetails = ({ control }: any) => {
  const {
    fields: incomeSourceFields,
    append: incomeSourceAppend,
    remove: incomeSourceRemove,
  } = useFieldArray({ control, name: 'incomeSourceDetails' });
  return (
    <GroupContainer>
      <Text fontSize="r1" fontWeight="SemiBold">
        INCOME SOURCE DETAILS
      </Text>
      <GroupContainer>
        {/* TODO ->  Add Controller*/}
        <Box display="flex" flexDirection="column">
          <Text fontSize="s3" mb={3}>
            Annual Family Income
          </Text>
          <Box display="flex" flexDirection="column" gap="s8">
            {annualFamilyIncome.map((item) => (
              <Checkbox>
                <Text fontSize="s3">{item}</Text>
              </Checkbox>
            ))}
          </Box>
        </Box>
        <div>
          <Text fontSize="s3" mb="s4">
            Income greater than 4 lakhs in the previous fiscal year
          </Text>
          <DynamicBoxGroupContainer>
            {incomeSourceFields.map((item, index) => {
              return (
                <Box key={item.id}>
                  <IncomeSource
                    control={control}
                    removeIncomeSource={() => incomeSourceRemove(index)}
                    index={index}
                  />
                </Box>
              );
            })}
            <Button
              alignSelf="start"
              leftIcon={<Icon size="md" as={AiOutlinePlus} />}
              variant="outline"
              onClick={() => incomeSourceAppend({})}
            >
              New Entry
            </Button>
          </DynamicBoxGroupContainer>
        </div>
      </GroupContainer>
    </GroupContainer>
  );
};
