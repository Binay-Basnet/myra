import React from 'react';
import {
  GroupContainer,
  InputGroupContainer,
} from '@coop/cbs/kym-form/ui-containers';
import { FormInput } from '@coop/shared/form';
import { useTranslation } from '@coop/shared/utils';

export const KymCoopDate = () => {
  const { t } = useTranslation();
  return (
    <GroupContainer id="Cooperative Date" scrollMarginTop={'200px'}>
      <InputGroupContainer>
        <FormInput
          type="date"
          name="lastAuditDate"
          label={t['kymCoopLastAuditDate']}
        />

        <FormInput
          type="date"
          name="lastAgmDate"
          label={t['kymCoopLastAGMDate']}
        />
      </InputGroupContainer>
    </GroupContainer>
  );
};
