import React from 'react';

import {
  GroupContainer,
  InputGroupContainer,
} from '@coop/cbs/kym-form/ui-containers';
import { FormInput } from '@coop/shared/form';
import { Text } from '@coop/shared/ui';
import { useTranslation } from '@coop/shared/utils';

export const KymCoopContactDetails = () => {
  const { t } = useTranslation();
  return (
    <GroupContainer id="kymCoopAccContactDetails" scrollMarginTop={'200px'}>
      <Text
        fontSize="r1"
        fontWeight="semibold"
        color="neutralColorLight.Gray-80"
      >
        {t['kymCoopContactDetails']}
      </Text>
      <InputGroupContainer>
        <FormInput
          type="text"
          name="email"
          label={t['kymCoopOfficialEmail']}
          placeholder={t['kymCoopEnterEmailAddress']}
        />
        <FormInput
          type="text"
          name="website"
          label={t['kymCoopWebsiteLink']}
          placeholder={t['kymCoopEnterWebsiteURL']}
        />

        <FormInput
          type="text"
          name="contactNumber"
          label={t['kymCoopPhoneno']}
          placeholder={t['kymCoopEnterPhoneNumber']}
        />
      </InputGroupContainer>
    </GroupContainer>
  );
};
