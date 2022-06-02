import React from 'react';
import { Control } from 'react-hook-form';
import { KymIndMemberInput } from '@saccos/myra/graphql';
import { Text } from '@saccos/myra/ui';

import { GroupContainer, InputGroupContainer } from '../containers';
import { FormInput } from '../../newFormComponents';

interface IMemberContactDetails {
  control: Control<KymIndMemberInput>;
}

export const MemberKYMContactDetails = ({ control }: IMemberContactDetails) => {
  return (
    <GroupContainer>
      <Text
        fontSize="r1"
        fontWeight="semibold"
        color="neutralColorLight.Gray-80"
      >
        CONTACT DETAILS
      </Text>
      <InputGroupContainer>
        <FormInput
          control={control}
          type="text"
          name="mobileNumber"
          label="Mobile No"
          placeholder="Enter Mobile No"
        />
        <FormInput
          control={control}
          type="text"
          name="phoneNumber"
          label="Phone No"
          placeholder="Enter Phone No"
        />
        <FormInput
          control={control}
          type="text"
          name="email"
          label="Email"
          placeholder="Enter email"
        />
      </InputGroupContainer>
    </GroupContainer>
  );
};
