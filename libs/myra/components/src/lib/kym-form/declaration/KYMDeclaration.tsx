import React from 'react';
import { Control } from 'react-hook-form';
import {
  Box,
  Checkbox,
  Grid,
  RadioGroup,
  Text,
  TextAreaInput,
  TextFields,
} from '@saccos/myra/ui';

import { GroupContainer, InputGroupContainer } from '../containers';
import { FormInput, FormSelect } from '../../newFormComponents';

interface IKYMDeclaration {
  control: Control<any>;
}

const details = ['Citizen', 'Permanent Resident', 'Resident'];

export const KYMDeclaration = ({ control }: IKYMDeclaration) => {
  return (
    <GroupContainer>
      <Box display="flex" flexDirection="column" gap="s16">
        <TextFields variant="formLabel">Next To Kin / Local Contact</TextFields>
        <Grid templateColumns="repeat(3, 1fr)" gap="s16">
          <FormInput
            control={control}
            type="text"
            name="nextToKinRelationship"
            placeholder="Relationship"
          />
          <FormInput
            control={control}
            type="text"
            name="nextToKinName"
            placeholder="Name"
          />
          <div />
          <FormInput
            control={control}
            type="text"
            name="nextToKinContactNo"
            placeholder="Contact No"
          />
          <FormInput
            control={control}
            type="text"
            name="nextToKinAddress"
            placeholder="Address"
          />
        </Grid>
      </Box>

      <Box display="flex" flexDirection="column" gap="s16">
        <TextFields variant="formLabel">
          Are you or any of your family politically exposed person{' '}
        </TextFields>
        <RadioGroup direction="row" radioList={['Yes', 'No']} />
      </Box>

      <Box display="flex" flexDirection="column" gap="s16">
        <TextFields variant="formLabel">
          Do you have a beneficial owner?{' '}
        </TextFields>
        <RadioGroup direction="row" radioList={['Yes', 'No']} />
      </Box>

      <InputGroupContainer>
        <FormSelect
          control={control}
          name={'beneficialOwnerDeclaration'}
          options={[{ label: 'Father', value: 'father' }]}
          placeholder="Relationship"
          label="If yes, please write name and relationship "
        />
      </InputGroupContainer>

      <Box display="flex" flexDirection="column" gap="s16">
        <TextFields variant="formLabel">
          Declaration of convicted/Non-convicted for any crimes in Past
        </TextFields>
        <RadioGroup direction="row" radioList={['Yes', 'No']} />
      </Box>

      <InputGroupContainer>
        <Box display="flex" flexDirection="column">
          <TextAreaInput label="Please specify" placeholder="Enter Details" />
        </Box>
      </InputGroupContainer>

      <Box display="flex" flexDirection="column" gap="s16">
        <TextFields variant="formLabel">
          Do you hold residential permit of foreign country?{' '}
        </TextFields>
        <RadioGroup direction="row" radioList={['Yes', 'No']} />
      </Box>

      <Box display="flex" flexDirection="column">
        <Text fontSize="s3" mb="s16">
          Specify following details
        </Text>
        <Box display="flex" flexDirection="column" gap="s8">
          {details.map((item) => (
            <Checkbox>
              <Text fontSize="s3">{item}</Text>
            </Checkbox>
          ))}
        </Box>
      </Box>
    </GroupContainer>
  );
};
