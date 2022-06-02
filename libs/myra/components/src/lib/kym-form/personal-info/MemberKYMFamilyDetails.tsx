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

const AddFamilyMember = ({ control, index, removeFamilyMember }: any) => {
  return (
    <DynamicBoxContainer>
      <CloseIcon
        cursor="pointer"
        onClick={removeFamilyMember}
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
            name={`familyDetails[${index}].relationshipId`}
            label="Relation"
            placeholder="Enter Relation"
          />
        </GridItem>
        <GridItem colSpan={2}>
          <FormInput
            control={control}
            type="text"
            bg="white"
            name={`familyDetails[${index}].fullName`}
            label="FullName"
            placeholder="Enter Full Name"
          />
        </GridItem>
      </InputGroupContainer>
    </DynamicBoxContainer>
  );
};

export const MemberKYMFamilyDetails = ({ control }: any) => {
  const {
    fields: familyFields,
    append: familyAppend,
    remove: familyRemove,
  } = useFieldArray({ control, name: 'familyDetails' });

  return (
    <GroupContainer>
      <Text fontSize="r1" fontWeight="SemiBold">
        FAMILY DETAILS
      </Text>
      <InputGroupContainer>
        <FormSelect
          control={control}
          name="martialStatus"
          label="Martial Status"
          placeholder="Select Martial Status"
          options={[
            { value: 'married', label: 'Married' },
            { value: 'unmarried', label: 'Unmarried' },
          ]}
        />
      </InputGroupContainer>

      <div>
        <Text fontSize="s3" mb="s4">
          Family members
        </Text>
        <DynamicBoxGroupContainer>
          {familyFields.map((item, index) => {
            return (
              <Box key={item.id}>
                <AddFamilyMember
                  control={control}
                  index={index}
                  removeFamilyMember={() => familyRemove(index)}
                />
              </Box>
            );
          })}
          <Button
            alignSelf="start"
            leftIcon={<Icon size="md" as={AiOutlinePlus} />}
            variant="outline"
            onClick={() => {
              familyAppend({});
            }}
          >
            Add Family Member
          </Button>
        </DynamicBoxGroupContainer>
      </div>
    </GroupContainer>
  );
};
