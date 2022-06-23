import React from 'react';
import { Control } from 'react-hook-form';
import {
  GroupContainer,
  InputGroupContainer,
} from '@coop/cbs/kym-form/ui-containers';
import { FormInput, FormSelect } from '@coop/shared/form';
import { KymIndMemberInput } from '@coop/shared/data-access';
import { Text } from '@coop/shared/ui';
import { useTranslation } from '@coop/shared/utils';

export const CurrentMembers = () => {
  const { t } = useTranslation();
  return (
    <GroupContainer id="Basic Information" scrollMarginTop={'200px'}>
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
