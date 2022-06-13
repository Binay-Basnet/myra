import React from 'react';
import {
  GroupContainer,
  InputGroupContainer,
} from '@coop/cbs/kym-form/ui-containers';
import { FormInput } from '@coop/myra/components';
import { Text } from '@coop/shared/ui';

export const KYMLocation = ({ control }: any) => {
  return (
    <GroupContainer>
      <Text fontSize="r1" fontWeight="SemiBold">
        LOCATION
      </Text>
      <InputGroupContainer>
        <FormInput
          control={control}
          name={'nearestPopularPlace'}
          label="Nearest Popular Place"
          placeholder="Nearest Popular Place"
        />
      </InputGroupContainer>
    </GroupContainer>
  );
};
