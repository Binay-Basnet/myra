import React from 'react';
import {
  GroupContainer,
  InputGroupContainer,
} from '@coop/cbs/kym-form/ui-containers';
import { FormInput } from '@coop/shared/form';
import { Text } from '@coop/shared/ui';
import { useTranslation } from '@coop/shared/utils';

export const KymCoopBasicInfo = () => {
  const { t } = useTranslation();
  return (
    <GroupContainer id="kymCoopAccBasicInformation" scrollMarginTop={'200px'}>
      <Text
        fontSize="r1"
        fontWeight="semibold"
        color="neutralColorLight.Gray-80"
      >
        {t['kymCoopBASICINFORMATION']}
      </Text>
      <FormInput
        w="65%"
        type="text"
        name={'nameOfOrganization'}
        label={t['kymCoopNameofOrganization']}
        placeholder={t['kymCoopEnterNameofOrganization']}
      />
      <InputGroupContainer>
        <FormInput
          type="text"
          name="regdNumber"
          label={t['kymCoopRegisrationNo']}
          placeholder={t['kymCoopEnterRegisteredNumber']}
        />

        <FormInput
          type="text"
          name="regdOffice"
          label={t['kymCoopRegistrationoffice']}
          placeholder={t['kymCoopEnterRegisteredAddress']}
        />
        <FormInput
          type="date"
          name="regdDate"
          label={t['kymCoopRegistrationDate']}
        />
      </InputGroupContainer>
    </GroupContainer>
  );
};
