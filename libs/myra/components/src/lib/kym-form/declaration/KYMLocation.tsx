import React from 'react';
import { Text } from '@saccos/myra/ui';

import { GroupContainer, InputGroupContainer } from '../containers';
import { FormInput } from '../../newFormComponents';

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
