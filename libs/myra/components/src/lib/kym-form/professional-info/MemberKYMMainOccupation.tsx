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

const MainOccupation = ({
  control,
  index,
  removeMainOccupation,
  watch,
}: any) => {
  const profession = watch('profession');

  return (
    <DynamicBoxContainer>
      <CloseIcon
        cursor="pointer"
        onClick={removeMainOccupation}
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
            name={`mainOccupation.${index}.occupation`}
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
            bg="white"
            control={control}
            type="text"
            name={`mainOccupation.${index}.orgName`}
            label="Org/Firm Name"
            placeholder="Org/Firm Name"
          />
        </GridItem>

        <FormInput
          control={control}
          bg="white"
          type="text"
          name={`mainOccupation.${index}.idNumber`}
          label="Pan / VAT No"
          placeholder="Pan/VAT Number"
        />
        <FormInput
          control={control}
          type="text"
          bg="white"
          name={`mainOccupation.${index}.address`}
          label="Address"
          placeholder="Enter Address"
        />
        <FormInput
          bg="white"
          control={control}
          type="number"
          textAlign={'right'}
          name={`mainOccupation.${index}.estimatedAnnualIncome`}
          label="Estimated Annual Income"
          placeholder="0.00"
        />
      </InputGroupContainer>
    </DynamicBoxContainer>
  );
};

export const MemberKYMMainOccupation = ({ control, watch }: any) => {
  const {
    fields: mainOccupationFields,
    append: mainOccupationAppend,
    remove: mainOccupationRemove,
  } = useFieldArray({ control, name: 'mainOccupation' });

  return (
    <GroupContainer>
      <Text fontSize="r1" fontWeight="SemiBold">
        MAIN OCCUPATION
      </Text>
      <DynamicBoxGroupContainer>
        {mainOccupationFields.map((item, index) => {
          return (
            <Box key={item.id}>
              <MainOccupation
                watch={watch}
                control={control}
                index={index}
                removeMainOccupation={() => mainOccupationRemove(index)}
              />
            </Box>
          );
        })}

        <Button
          alignSelf="start"
          leftIcon={<Icon size="md" as={AiOutlinePlus} />}
          variant="outline"
          onClick={() => {
            mainOccupationAppend({});
          }}
        >
          Add Occupation
        </Button>
      </DynamicBoxGroupContainer>
    </GroupContainer>
  );
};
