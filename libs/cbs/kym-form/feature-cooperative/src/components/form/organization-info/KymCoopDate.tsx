import React from 'react';
import {
  GroupContainer,
  InputGroupContainer,
} from '@coop/cbs/kym-form/ui-containers';
import { FormInput } from '@coop/myra/components';

export const KymCoopDate = () => {
  return (
    <GroupContainer scrollMarginTop={'200px'}>
      <InputGroupContainer>
        <FormInput type="date" name="lastAuditDate" label="Last Audit Date" />

        <FormInput type="date" name="lastAuditDate" label="Last AGM Date" />
      </InputGroupContainer>
    </GroupContainer>
  );
};
