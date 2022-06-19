import React from 'react';
import { Control } from 'react-hook-form';
import {
  GroupContainer,
  InputGroupContainer,
} from '@coop/cbs/kym-form/ui-containers';
import { FormInput, FormSelect } from '@coop/shared/form';
import { KymIndMemberInput } from '@coop/shared/data-access';
import { Text } from '@coop/shared/ui';

export const CurrentMembers = () => {
  return (
    <GroupContainer id="Basic Information" scrollMarginTop={'200px'}>
      <Text
        fontSize="r1"
        fontWeight="semibold"
        color="neutralColorLight.Gray-80"
      >
        Current Members
      </Text>
      <InputGroupContainer>
        <FormInput
          type="number"
          name="firstName"
          textAlign={'left'}
          label="No. of Male members"
          placeholder="Enter number of Male Members"
        />
        <FormInput
          type="number"
          name="firstName"
          textAlign={'left'}
          label="No. of Female members"
          placeholder="Enter number of Female Members"
        />
        <FormInput
          type="number"
          name="firstName"
          textAlign={'left'}
          label="No. of Institutional members"
          placeholder="Enter number of institutional members"
        />
        <FormInput
          type="number"
          name="firstName"
          textAlign={'left'}
          label="No. of Institutional members"
          placeholder="Enter number of institutional members"
        />
      </InputGroupContainer>
    </GroupContainer>
  );
};
