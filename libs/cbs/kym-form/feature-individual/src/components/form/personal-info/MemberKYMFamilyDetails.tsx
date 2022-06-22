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
import {
  KymIndMemberInput,
  useGetIndividualKymOptionQuery,
} from '@coop/shared/data-access';
import { FormInput, FormSelect } from '@coop/shared/form';
import { Box, Button, GridItem, Icon, Text } from '@coop/shared/ui';

import { getFieldOption } from '../../../utils/getFieldOption';

interface IAddFamilyMember {
  index: number;
  removeFamilyMember: () => void;
}

const AddFamilyMember = ({ index, removeFamilyMember }: IAddFamilyMember) => {
  const { data: familyRelationShipData, isLoading: familyRelationshipLoading } =
    useGetIndividualKymOptionQuery({
      fieldName: 'family_relationship',
    });

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
          <FormSelect
            name={`familyDetails.${index}.relationshipId`}
            label="Relationship"
            placeholder="Select Relationship"
            isLoading={familyRelationshipLoading}
            options={getFieldOption(familyRelationShipData)}
          />
        </GridItem>
        <GridItem colSpan={1}>
          <FormInput
            type="text"
            bg="white"
            name={`familyDetails.${index}.fullName`}
            label="Full Name"
            placeholder="Enter Full Name"
          />
        </GridItem>

        {/*
        TODO ( UNCOMMENT THIS AFTER BACKEND )
        <GridItem colSpan={1}>
          <FormInput
            type="date"
            bg="white"
            name={`familyDetails.${index}.dateOfBirth`}
            label="Date of Birth (BS)"
            placeholder="Enter Date of Birth"
          />
        </GridItem>*/}
      </InputGroupContainer>
    </DynamicBoxContainer>
  );
};

export const MemberKYMFamilyDetails = () => {
  const { control } = useFormContext<KymIndMemberInput>();

  const { data: maritalStatusData, isLoading: maritalStatusLoading } =
    useGetIndividualKymOptionQuery({
      fieldName: 'marital_status',
    });

  const {
    fields: familyFields,
    append: familyAppend,
    remove: familyRemove,
  } = useFieldArray({ control, name: 'familyDetails' });

  return (
    <GroupContainer id="Family Details" scrollMarginTop={'200px'}>
      <Text fontSize="r1" fontWeight="SemiBold">
        FAMILY DETAILS
      </Text>
      <InputGroupContainer>
        <FormSelect
          name={'maritalStatus'}
          label="Martial Status"
          placeholder="Select Martial Status"
          isLoading={maritalStatusLoading}
          options={getFieldOption(maritalStatusData)}
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
