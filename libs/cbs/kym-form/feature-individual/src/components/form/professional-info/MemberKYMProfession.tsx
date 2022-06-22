import React from 'react';
import { Skeleton } from '@chakra-ui/react';

import { GroupContainer } from '@coop/cbs/kym-form/ui-containers';
import { useGetIndividualKymOptionQuery } from '@coop/shared/data-access';
import { FormCheckboxGroup } from '@coop/shared/form';
import { Text } from '@coop/shared/ui';

import { getFieldOption } from '../../../utils/getFieldOption';

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
  const { data: occupationData, isLoading: occupationLoading } =
    useGetIndividualKymOptionQuery({
      fieldName: 'occupation',
    });

  return (
    <GroupContainer id="Profession" scrollMarginTop={'200px'}>
      <Text fontSize="r1" fontWeight="SemiBold">
        PROFESSION
      </Text>

      {occupationLoading ? (
        <Skeleton height="40px" />
      ) : (
        <FormCheckboxGroup
          name={'profession'}
          showOther
          list={getFieldOption(occupationData)}
        />
      )}
    </GroupContainer>
  );
};
