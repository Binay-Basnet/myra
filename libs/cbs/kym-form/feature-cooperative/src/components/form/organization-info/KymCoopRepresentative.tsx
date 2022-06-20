import React from 'react';
import {
  GroupContainer,
  InputGroupContainer,
} from '@coop/cbs/kym-form/ui-containers';
import { FormInput } from '@coop/shared/form';
import { Text } from '@coop/shared/ui';

export const KymCoopRepresentative = () => {
  return (
    <GroupContainer id="Representative" scrollMarginTop={'200px'}>
      <Text
        fontSize="r1"
        fontWeight="semibold"
        color="neutralColorLight.Gray-80"
      >
        Representative
      </Text>
      <InputGroupContainer>
        <FormInput
          type="text"
          name="representativeFullName"
          label="Name"
          placeholder="Enter Name"
        />
        <FormInput
          type="text"
          name="representativeDesignatiton"
          label="Designation"
          placeholder="Enter Designation"
        />
      </InputGroupContainer>
    </GroupContainer>
  );
};
