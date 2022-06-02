import React from 'react';
import { Controller } from 'react-hook-form';
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
import { FormSelect } from '../../newFormComponents';

export const KYMBasicSaccosDetails = ({ control }: any) => {
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
      <Box display="flex" flexDirection="column" gap="s8">
        <TextFields variant="formLabel">
          Member of Another Cooperative
        </TextFields>
        <RadioGroup direction="row" radioList={['Yes', 'No']} />
      </Box>

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
        <Text fontSize="s3">Family member in this instituttion</Text>
        <Grid templateColumns="repeat(6, 1fr)" gap={'1em'}>
          <GridItem colSpan={1}>
            <Controller
              control={control}
              name="saccosMemberRelationship"
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
          <Button
            variant="outline"
            leftIcon={<Icon size="md" as={AiOutlineSearch} />}
          >
            Find Member
          </Button>
        </Grid>
        <Button
          alignSelf="start"
          mt="s8"
          leftIcon={<Icon size="md" as={AiOutlinePlus} />}
          variant="outline"
        >
          Add Family Member
        </Button>
      </Box>
    </GroupContainer>
  );
};
