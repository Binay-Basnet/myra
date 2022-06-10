import React from 'react';
import { useFieldArray } from 'react-hook-form';
import { AiOutlinePlus } from 'react-icons/ai';
import { CloseIcon } from '@chakra-ui/icons';
import { Box, Button, GridItem, Icon, Text } from '@coop/myra/ui';

import {
  DynamicBoxContainer,
  DynamicBoxGroupContainer,
  GroupContainer,
  InputGroupContainer,
} from '../containers';
import { FormInput, FormSelect } from '../../newFormComponents';

const HusbandWifeOccupation = ({
  control,
  index,
  removeHusbandWifeOccupation,
  watch,
}: any) => {
  const profession = watch('profession');

  return (
    <DynamicBoxContainer>
      <CloseIcon
        cursor="pointer"
        onClick={removeHusbandWifeOccupation}
        color="gray.500"
        _hover={{
          color: 'gray.900',
        }}
        aria-label="close"
        alignSelf="flex-end"
      />
      <InputGroupContainer>
        <GridItem colSpan={1}>
          <FormSelect
            control={control}
            name={`spouseOccupation.${index}.occupation`}
            label="Occupation"
            placeholder="Select Occupation"
            options={
              profession?.map((data: string) => ({
                label: data,
                value: data,
              })) ?? []
            }
          />
        </GridItem>
        <GridItem colSpan={2}>
          <FormInput
            control={control}
            type="text"
            name={`spouseOccupation.${index}.orgName`}
            label="Org/Firm Name"
            placeholder="Org/Firm Name"
            bg="white"
          />
        </GridItem>
        <FormInput
          control={control}
          type="text"
          name={`spouseOccupation.${index}.idNumber`}
          label="Pan / VAT No"
          placeholder="Pan/Vat Number"
          bg="white"
        />
        <FormInput
          control={control}
          type="text"
          name={`spouseOccupation.${index}.address`}
          label="Address"
          placeholder="Enter Address"
          bg="white"
        />
        <FormInput
          control={control}
          type="number"
          textAlign={'right'}
          name={`spouseOccupation.${index}.estimatedAnnualIncome`}
          label="Estimated Annual Income"
          bg="white"
          placeholder="0.00"
        />
      </InputGroupContainer>
    </DynamicBoxContainer>
  );
};

export const MemberKYMHusbandWifeOccupation = ({ control, watch }: any) => {
  const {
    fields: husbandWifeOccupationFields,
    append: husbandWifeOccupationAppend,
    remove: husbandWifeOccupationRemove,
  } = useFieldArray({ control, name: 'spouseOccupation' });

  return (
    <GroupContainer
      id="Main Occupation of Husaband/Wife"
      scrollMarginTop={'200px'}
    >
      <Text fontSize="r1" fontWeight="SemiBold">
        MAIN OCCUPATION OF HUSBAND/WIFE
      </Text>

      <DynamicBoxGroupContainer>
        {husbandWifeOccupationFields.map((item, index) => {
          return (
            <Box key={item.id}>
              <HusbandWifeOccupation
                control={control}
                index={index}
                watch={watch}
                removeHusbandWifeOccupation={() =>
                  husbandWifeOccupationRemove(index)
                }
              />
            </Box>
          );
        })}

        <Button
          alignSelf="start"
          leftIcon={<Icon size="md" as={AiOutlinePlus} />}
          variant="outline"
          onClick={() => {
            husbandWifeOccupationAppend({});
          }}
        >
          Add Occupation
        </Button>
      </DynamicBoxGroupContainer>
    </GroupContainer>
  );
};
