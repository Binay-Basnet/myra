import React from 'react';
import {
  GroupContainer,
  InputGroupContainer,
} from '@coop/cbs/kym-form/ui-containers';
import { FormInput } from '@coop/shared/form';
import { Text } from '@coop/shared/ui';
import { useTranslation } from '@coop/shared/utils';

export const KymCoopRepresentative = () => {
  const { t } = useTranslation();
  return (
    <GroupContainer id="Representative" scrollMarginTop={'200px'}>
      <Text
        fontSize="r1"
        fontWeight="semibold"
        color="neutralColorLight.Gray-80"
      >
        {t['kymCoopRepresentative']}
      </Text>
      <InputGroupContainer>
        <FormInput
          type="text"
          name="representativeFullName"
          label={t['kymCoopName']}
          placeholder={t['kymCoopEnterName']}
        />
        <FormInput
          type="text"
          name="representativeDesignatiton"
          label={t['kymCoopDesignation']}
          placeholder={t['kymCoopEnterDesignation']}
        />
      </InputGroupContainer>
    </GroupContainer>
  );
};
