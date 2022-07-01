import React from 'react';

import {
  GroupContainer,
  InputGroupContainer,
} from '@coop/cbs/kym-form/ui-containers';
import { FormEmailInput, FormPhoneNumber } from '@coop/shared/form';
import { Text } from '@coop/shared/ui';
import { useTranslation } from '@coop/shared/utils';

export const MemberKYMContactDetails = () => {
  const { t } = useTranslation();
  return (
    <GroupContainer id="kymAccIndContactDetails" scrollMarginTop={'200px'}>
      <Text
        fontSize="r1"
        fontWeight="semibold"
        color="neutralColorLight.Gray-80"
      >
        {t['kymIndCONTACTDETAILS']}
      </Text>
      <InputGroupContainer>
        <FormPhoneNumber
          type="text"
          name="mobileNumber"
          label={t['kymIndMobileNo']}
          placeholder={t['kymIndEnterMobileNo']}
        />
        <FormPhoneNumber
          type="text"
          name="phoneNumber"
          label={t['kymIndPhoneNo']}
          placeholder={t['kymIndEnterPhoneNo']}
        />
        <FormEmailInput
          type="text"
          name="email"
          label={t['kymIndEmail']}
          placeholder={t['kymIndEnterEmail']}
        />
      </InputGroupContainer>
    </GroupContainer>
  );
};
