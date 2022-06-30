import React from 'react';
import { Skeleton } from '@chakra-ui/react';

import { GroupContainer } from '@coop/cbs/kym-form/ui-containers';
import {
  Kym_Field_Custom_Id as KYMOptionEnum,
  useGetIndividualKymOptionsQuery,
} from '@coop/shared/data-access';
import { FormCheckboxGroup } from '@coop/shared/form';
import { Text } from '@coop/shared/ui';
import { useTranslation } from '@coop/shared/utils';

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
  const { t } = useTranslation();
  const { data: occupationData, isLoading: occupationLoading } =
    useGetIndividualKymOptionsQuery({
      filter: { customId: KYMOptionEnum.Occupation },
    });

  return (
    <GroupContainer id="kymAccIndProfession" scrollMarginTop={'200px'}>
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
