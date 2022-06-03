import React from 'react';
import { Controller, useFieldArray } from 'react-hook-form';
import { AiOutlinePlus, AiOutlineSearch } from 'react-icons/ai';
import {
  Box,
  Button,
  Grid,
  GridItem,
  Icon,
  Input,
  RadioGroup,
  Select,
  Text,
  TextFields,
} from '@saccos/myra/ui';

import { GroupContainer, InputGroupContainer } from '../containers';
import { FormRadioGroup, FormSelect } from '../../newFormComponents';

export const KYMBasicSaccosDetails = ({ control }: any) => {
  const {
    fields: familyMemberFields,
    append: familyMemberAppend,
    remove: familyMemberRemove,
  } = useFieldArray({
    control,
    name: 'familyMemberInThisCooperative',
  });

  return (
    <GroupContainer>
      <InputGroupContainer>
        <FormSelect
          control={control}
          name="purposeId"
          label="Main purpose of becoming a member"
          placeholder="Select purpose of becoming a member"
          options={[
            { label: 'Fun', value: 'fun' },
            { label: 'For Interest', value: 'interest' },
          ]}
        />
      </InputGroupContainer>

      <FormRadioGroup
        control={control}
        label="Member of Another Cooperative"
        name={'isMemberOfAnotherCooperative'}
        radioList={['Yes', 'No']}
      />

      <Box display="flex" flexDirection="column" gap="s4">
        <TextFields variant="formLabel">Membership Details</TextFields>
        <InputGroupContainer>
          <GridItem colSpan={2}>
            <Controller
              control={control}
              name="nameAddressCooperative"
              render={({ field: { onChange } }) => (
                <Input
                  type="text"
                  placeholder="Name and Address Cooperative"
                  onChange={onChange}
                  bg="white"
                />
              )}
            />
          </GridItem>
          <GridItem colSpan={1}>
            <Controller
              control={control}
              name="memberNo"
              render={({ field: { onChange } }) => (
                <Input
                  type="text"
                  placeholder="Member No"
                  onChange={onChange}
                  bg="white"
                />
              )}
            />
          </GridItem>
        </InputGroupContainer>
      </Box>

      <Box display="flex" flexDirection="column" gap="s8">
        <TextFields variant="formLabel">
          Family Member in this institution
        </TextFields>
        <RadioGroup direction="row" radioList={['Yes', 'No']} />
      </Box>

      <Box display="flex" flexDirection="column" gap="s4">
        <Text fontSize="s3">Family member in this institution</Text>

        {familyMemberFields.map((item, index) => {
          return (
            <Box key={item.id}>
              <FamilyMember
                control={control}
                index={index}
                removeFamilyMember={() => familyMemberRemove(index)}
              />
            </Box>
          );
        })}

        <Button
          alignSelf="start"
          mt="s8"
          leftIcon={<Icon size="md" as={AiOutlinePlus} />}
          variant="outline"
          onClick={() => {
            familyMemberAppend({});
          }}
        >
          Add Family Member
        </Button>
      </Box>
    </GroupContainer>
  );
};

export const FamilyMember = ({
  control,
  index,
  removeFamilyMember,
  watch,
}: any) => {
  return (
    <Grid templateColumns="repeat(6, 1fr)" gap="s16">
      <GridItem colSpan={1}>
        <Controller
          control={control}
          name={`familyMemberInThisCooperative.${index}.relationshipId`}
          render={({ field: { onChange } }) => (
            <Select
              onChange={onChange}
              placeholder="Relationship"
              options={[
                { label: 'Mother', value: 'mother' },
                { label: 'Father', value: 'father' },
              ]}
            />
          )}
        />
      </GridItem>
      <GridItem colSpan={2}>
        <Controller
          control={control}
          name={`familyMemberInThisCooperative.${index}.memberId`}
          render={({ field: { onChange } }) => (
            <Input
              type="text"
              placeholder="Member No"
              onChange={onChange}
              bg="white"
            />
          )}
        />
      </GridItem>
      <Button
        variant="outline"
        leftIcon={<Icon size="md" as={AiOutlineSearch} />}
      >
        Find Member
      </Button>
    </Grid>
  );
};
