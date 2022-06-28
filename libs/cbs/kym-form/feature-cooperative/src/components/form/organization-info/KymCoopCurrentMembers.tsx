import React from 'react';
import {
  GroupContainer,
  InputGroupContainer,
} from '@coop/cbs/kym-form/ui-containers';
import { FormInput } from '@coop/shared/form';
import { Text } from '@coop/shared/ui';
import { useTranslation } from '@coop/shared/utils';

export const KymCoopCurrentMembers = () => {
  const { t } = useTranslation();
  return (
    <GroupContainer id="kymCoopAccCurrentMembers" scrollMarginTop={'200px'}>
      <Text
        fontSize="r1"
        fontWeight="semibold"
        color="neutralColorLight.Gray-80"
      >
        {t['kymCoopCurrentMembers']}
      </Text>
      <InputGroupContainer>
        <FormInput
          type="text"
          name="noOfMaleMembers"
          label={t['kymCoopNoofMalemembers']}
          placeholder={t['kymCoopEnternumberofMaleMembers']}
        />
        <FormInput
          type="text"
          name="noOfFemaleMembers"
          label={t['kymCoopNoofFemalemembers']}
          placeholder={t['kymCoopEnternumberofFemaleMembers']}
        />

        <FormInput
          type="text"
          name="noOfOtherMembers"
          label={t['kymCoopNoofOthermembers']}
          placeholder={t['kymCoopEnternumberofOthermembers']}
        />
      </InputGroupContainer>
    </GroupContainer>
  );
};
