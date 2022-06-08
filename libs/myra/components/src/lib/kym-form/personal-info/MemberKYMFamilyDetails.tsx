import React from 'react';
import { Control, useFieldArray } from 'react-hook-form';
import { AiOutlinePlus } from 'react-icons/ai';
import { CloseIcon } from '@chakra-ui/icons';
import { KymIndMemberInput } from '@coop/myra/graphql';
import { Box, Button, GridItem, Icon, Text } from '@coop/myra/ui';

import {
  DynamicBoxContainer,
  DynamicBoxGroupContainer,
  GroupContainer,
  InputGroupContainer,
} from '../containers';
import { FormInput, FormSelect } from '../../newFormComponents';

interface IAddFamilyMember {
  control: Control<KymIndMemberInput>;
  index: number;
  removeFamilyMember: () => void;
}

const AddFamilyMember = ({
  control,
  index,
  removeFamilyMember,
}: IAddFamilyMember) => {
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
            name={`familyDetails.${index}.relationshipId`}
            label="Relation"
            placeholder="Enter Relation"
          />
        </GridItem>
        <GridItem colSpan={1}>
          <FormInput
            control={control}
            type="text"
            bg="white"
            name={`familyDetails.${index}.fullName`}
            label="FullName"
            placeholder="Enter Full Name"
          />
        </GridItem>

        <GridItem colSpan={1}>
          <FormInput
            control={control}
            type="date"
            bg="white"
            name={`familyDetails.${index}.dob`}
            label="Date Of Birth"
          />
        </GridItem>
      </InputGroupContainer>
    </DynamicBoxContainer>
  );
};

interface IMemberKYMFamilyDetails {
  control: Control<KymIndMemberInput | any>;
}

export const MemberKYMFamilyDetails = ({
  control,
}: IMemberKYMFamilyDetails) => {
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
          name={'maritalStatus'}
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
