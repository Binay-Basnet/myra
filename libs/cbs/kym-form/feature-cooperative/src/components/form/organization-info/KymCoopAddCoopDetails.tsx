import React from 'react';
import {
  GroupContainer,
  InputGroupContainer,
} from '@coop/cbs/kym-form/ui-containers';
import { FormInput, FormSelect } from '@coop/myra/components';
import { Text } from '@coop/shared/ui';

export const KymCoopAddCoopDetails = () => {
  return (
    <GroupContainer
      id="Additional Coorperative Details"
      scrollMarginTop={'200px'}
    >
      <Text
        fontSize="r1"
        fontWeight="semibold"
        color="neutralColorLight.Gray-80"
      >
        Additional Coorperative Details
      </Text>
      <InputGroupContainer>
        <FormSelect
          name="economicDetailType"
          label="Type"
          placeholder="Select Type"
          options={[
            { label: 'Economy', value: 'economy' },
            { label: 'Maths', value: 'maths' },
          ]}
        />
        <FormInput
          type="text"
          name="mainServiceProduct:"
          label="Main Service/Product"
          placeholder="Enter Main Service/Product"
        />
      </InputGroupContainer>
    </GroupContainer>
  );
};
