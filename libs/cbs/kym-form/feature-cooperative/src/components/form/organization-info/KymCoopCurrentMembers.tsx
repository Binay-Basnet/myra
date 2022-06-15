import React from 'react';
import {
  GroupContainer,
  InputGroupContainer,
} from '@coop/cbs/kym-form/ui-containers';
import { FormInput } from '@coop/myra/components';
import { Text } from '@coop/shared/ui';

export const KymCoopCurrentMembers = () => {
  return (
    <GroupContainer id="Current Members" scrollMarginTop={'200px'}>
      <Text
        fontSize="r1"
        fontWeight="semibold"
        color="neutralColorLight.Gray-80"
      >
        Current Members
      </Text>
      <InputGroupContainer>
        <FormInput
          type="text"
          name="noOfMaleMembers"
          label="No. of Male members"
          placeholder="Enter number of Male Members"
        />
        <FormInput
          type="text"
          name="noOfFemaleMembers"
          label="No. of Female members"
          placeholder="Enter number of Female Members"
        />

        <FormInput
          type="text"
          name="noOfOtherMembers"
          label="No. of Other members"
          placeholder="Enter number of Other members"
        />
      </InputGroupContainer>
    </GroupContainer>
  );
};
