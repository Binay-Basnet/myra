import React from 'react';

import {
  GroupContainer,
  InputGroupContainer,
} from '@coop/cbs/kym-form/ui-containers';
import { FormEmailInput, FormPhoneNumber } from '@coop/shared/form';
import { Text } from '@coop/shared/ui';

export const MemberKYMContactDetails = () => {
  return (
    <GroupContainer id="Contact Details" scrollMarginTop={'200px'}>
      <Text
        fontSize="r1"
        fontWeight="semibold"
        color="neutralColorLight.Gray-80"
      >
        CONTACT DETAILS
      </Text>
      <InputGroupContainer>
        <FormPhoneNumber
          type="text"
          name="mobileNumber"
          label="Mobile No"
          placeholder="Enter Mobile No"
        />
        <FormPhoneNumber
          type="text"
          name="phoneNumber"
          label="Phone No"
          placeholder="Enter Phone No"
        />
        <FormEmailInput
          type="text"
          name="email"
          label="Email"
          placeholder="Enter email"
        />
      </InputGroupContainer>
    </GroupContainer>
  );
};
