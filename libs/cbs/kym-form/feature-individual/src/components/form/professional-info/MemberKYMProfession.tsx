import React from 'react';
import { Skeleton } from '@chakra-ui/react';

import { GroupContainer } from '@coop/cbs/kym-form/ui-containers';
import { useGetIndividualKymOptionQuery } from '@coop/shared/data-access';
import { FormCheckboxGroup } from '@coop/shared/form';
import { Text } from '@coop/shared/ui';

import { getFieldOption } from '../../../utils/getFieldOption';
import { useTranslation } from '@coop/shared/utils';

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
  const { t } = useTranslation();
  const { data: occupationData, isLoading: occupationLoading } =
    useGetIndividualKymOptionQuery({
      fieldName: 'occupation',
    });

  return (
    <GroupContainer id="Profession" scrollMarginTop={'200px'}>
      <Text fontSize="r1" fontWeight="SemiBold">
        {t['kymIndPROFESSION']}
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
