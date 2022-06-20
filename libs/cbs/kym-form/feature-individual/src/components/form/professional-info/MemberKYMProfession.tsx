import React from 'react';
import { Control } from 'react-hook-form';

import { GroupContainer } from '@coop/cbs/kym-form/ui-containers';
import { KymIndProfessionalStatus } from '@coop/shared/data-access';
import { FormCheckboxGroup } from '@coop/shared/form';
import { Text } from '@coop/shared/ui';

const occupationDetails = [
  'Agriculture',
  'Retired-Govt, Private',
  'Student',
  'Housewife',
  'Salary',
  'Business',
  'Foreign Employment',
];

export const MemberKYMProfession = () => {
  return (
    <GroupContainer id="Profession" scrollMarginTop={'200px'}>
      <Text fontSize="r1" fontWeight="SemiBold">
        PROFESSION
      </Text>

      <FormCheckboxGroup
        name={'profession'}
        showOther
        list={occupationDetails.map((detail) => ({
          label: detail,
          value: detail,
        }))}
      />
    </GroupContainer>
  );
};
