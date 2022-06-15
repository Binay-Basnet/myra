import React from 'react';
import {
  GroupContainer,
  InputGroupContainer,
} from '@coop/cbs/kym-form/ui-containers';
import { FormInput } from '@coop/myra/components';
import { Text } from '@coop/shared/ui';

export const KymCoopBasicInfo = () => {
  return (
    <GroupContainer id="Basic Information" scrollMarginTop={'200px'}>
      <Text
        fontSize="r1"
        fontWeight="semibold"
        color="neutralColorLight.Gray-80"
      >
        BASIC INFORMATION
      </Text>
      <FormInput
        w="65%"
        type="text"
        name={'nameOfOrganization'}
        label="Name of Organization"
        placeholder="Enter Name of Organization"
      />
      <InputGroupContainer>
        <FormInput
          type="text"
          name="regdNumber"
          label="Regisration No"
          placeholder="Enter Registered Number"
        />

        <FormInput
          type="text"
          name="regdOffice"
          label="Registration office"
          placeholder="Enter Registered Address"
        />
        <FormInput type="date" name="regdDate" label="Registration Date" />
      </InputGroupContainer>
    </GroupContainer>
  );
};
