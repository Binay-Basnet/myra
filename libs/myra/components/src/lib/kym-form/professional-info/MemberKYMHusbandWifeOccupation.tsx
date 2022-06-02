import React from 'react';
import { useFieldArray } from 'react-hook-form';
import { AiOutlinePlus } from 'react-icons/ai';
import { CloseIcon } from '@chakra-ui/icons';
import { Box, Button, GridItem, Icon, Text } from '@saccos/myra/ui';

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
}: any) => {
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
            bg="white"
          />
        </GridItem>
        <FormInput
          control={control}
          type="text"
          name={`spouceOccupation[${index}].idNumber`}
          label="Pan/Vat number"
          placeholder="Pan/Vat number"
          bg="white"
        />
        <FormInput
          control={control}
          type="text"
          name={`spouceOccupation[${index}].address`}
          label="Address"
          placeholder="Enter Address"
          bg="white"
        />
        <FormInput
          control={control}
          type="number"
          name={`spouceOccupation[${index}].estimatedAnnualIncome`}
          label="Annual Income"
          bg="white"
          placeholder="0.00"
        />
      </InputGroupContainer>
    </DynamicBoxContainer>
  );
};

export const MemberKYMHusbandWifeOccupation = ({ control }: any) => {
  const {
    fields: husbandWifeOccupationFields,
    append: husbandWifeOccupationAppend,
    remove: husbandWifeOccupationRemove,
  } = useFieldArray({ control, name: 'mainOccupation' });

  return (
    <GroupContainer>
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
