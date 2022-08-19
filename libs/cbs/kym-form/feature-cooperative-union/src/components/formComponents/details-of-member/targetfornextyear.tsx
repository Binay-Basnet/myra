import React from 'react';

import {
  GroupContainer,
  InputGroupContainer,
} from '@coop/cbs/kym-form/ui-containers';
import { FormInput } from '@coop/shared/form';
import { Text } from '@coop/shared/ui';
import { useTranslation } from '@coop/shared/utils';

export const CurrentMembers = () => {
  const { t } = useTranslation();
  return (
    <GroupContainer
      id="kymCoopUnionAccTargetfornextfiscalyear"
      scrollMarginTop={'200px'}
    >
      <Text
        fontSize="r1"
        fontWeight="semibold"
        color="neutralColorLight.Gray-80"
      >
        {t['kymCoopUnionCurrentMembers']}
      </Text>
      <InputGroupContainer>
        <FormInput
          type="number"
          name="firstName"
          textAlign={'left'}
          label={t['kymCoopUnionNoofMalemembers']}
          placeholder={t['kymCoopUnionEnternoofMaleMembers']}
        />
        <FormInput
          type="number"
          name="firstName"
          textAlign={'left'}
          label={t['kymCoopUnionNoofFemalemembers']}
          placeholder={t['kymCoopUnionEnternoofFemaleMembers']}
        />
        <FormInput
          type="number"
          name="firstName"
          textAlign={'left'}
          label={t['kymCoopUnionNoofInstitutionalmembers']}
          placeholder={t['kymCoopUnionEnternoofInstitutuionalMembers']}
        />
        <FormInput
          type="number"
          name="firstName"
          textAlign={'left'}
          label={t['kymCoopUnionTotalcurrentmembers']}
          placeholder={t['kymCoopUnionEntertotalcurrentmembers']}
        />
      </InputGroupContainer>
    </GroupContainer>
  );
};
