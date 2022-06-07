import React from 'react';
import { Control } from 'react-hook-form';
import { KymIndMemberInput } from '@coop/myra/graphql';
import { Text } from '@coop/myra/ui';

import { GroupContainer, InputGroupContainer } from '../containers';
import { FormEmailInput } from '../../newFormComponents/FormEmailInput';
import { FormPhoneNumber } from '../../newFormComponents/FormPhoneNumber';

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
        <FormPhoneNumber
          control={control}
          type="text"
          name="mobileNumber"
          label="Mobile No"
          placeholder="Enter Mobile No"
        />
        <FormPhoneNumber
          control={control}
          type="text"
          name="phoneNumber"
          label="Phone No"
          placeholder="Enter Phone No"
        />
        <FormEmailInput
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
