import React from 'react';
import {
  GroupContainer,
  InputGroupContainer,
} from '@coop/cbs/kym-form/ui-containers';
import { FormInput } from '@coop/myra/components';
import { Text } from '@coop/shared/ui';

export const KymCoopContactDetails = () => {
  return (
    <GroupContainer id="Contact Details" scrollMarginTop={'200px'}>
      <Text
        fontSize="r1"
        fontWeight="semibold"
        color="neutralColorLight.Gray-80"
      >
        Contact Details
      </Text>
      <InputGroupContainer>
        <FormInput
          type="text"
          name="email"
          label="Official Email"
          placeholder="Enter Email Address"
        />
        <FormInput
          type="text"
          name="website"
          label="Website Link"
          placeholder="Enter Website URL"
        />

        <FormInput
          type="text"
          name="contactNumber"
          label="Phone no."
          placeholder="Enter Phone Number"
        />
      </InputGroupContainer>
    </GroupContainer>
  );
};
