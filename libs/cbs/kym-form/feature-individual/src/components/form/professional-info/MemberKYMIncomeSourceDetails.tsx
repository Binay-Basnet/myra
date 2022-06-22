import React from 'react';
import { useFieldArray, useFormContext } from 'react-hook-form';
import { AiOutlinePlus } from 'react-icons/ai';
import { CloseIcon } from '@chakra-ui/icons';

import {
  DynamicBoxContainer,
  DynamicBoxGroupContainer,
  GroupContainer,
  InputGroupContainer,
} from '@coop/cbs/kym-form/ui-containers';
import { useGetIndividualKymOptionQuery } from '@coop/shared/data-access';
import { FormAmountInput, FormInput, FormRadioGroup } from '@coop/shared/form';
import { Box, Button, GridItem, Icon, Text } from '@coop/shared/ui';

import { getFieldOption } from '../../../utils/getFieldOption';

const annualFamilyIncome = [
  'Upto 4 lakhs',
  '4 Lakhs to 10 Lakhs',
  '10 Lakhs to 25 Lakhs',
  '25 Lakhs to 50 Lakhs',
  'More than 50 Lakhs',
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
        <GridItem colSpan={2}>
          <FormInput
            control={control}
            type="text"
            bg="white"
            name={`incomeSourceDetails.${index}.source`}
            label="Income Source"
            placeholder="Enter Income Source"
          />
        </GridItem>
        <GridItem colSpan={1}>
          <FormAmountInput
            control={control}
            bg="white"
            name={`incomeSourceDetails.${index}.amount`}
            label="Amount"
            placeholder="0.00"
          />
        </GridItem>
      </InputGroupContainer>
    </DynamicBoxContainer>
  );
};

export const MemberKYMIncomeSourceDetails = () => {
  const { data: familyIncomeData, isLoading: familyIncomeLoading } =
    useGetIndividualKymOptionQuery({
      fieldName: 'family_income',
    });

  const { control } = useFormContext();

  const {
    fields: incomeSourceFields,
    append: incomeSourceAppend,
    remove: incomeSourceRemove,
  } = useFieldArray({ control, name: 'incomeSourceDetails' });

  return (
    <GroupContainer id="Income Source Details" scrollMarginTop={'200px'}>
      <Text fontSize="r1" fontWeight="SemiBold">
        INCOME SOURCE DETAILS
      </Text>
      <GroupContainer>
        <Box display="flex" flexDirection="column">
          <Text fontSize="s3" mb={3}>
            Annual Family Income
          </Text>

          <FormRadioGroup
            name="annualIncomeSourceId"
            options={getFieldOption(familyIncomeData)}
          />
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
              id="incomeSourceDetailsButton"
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
