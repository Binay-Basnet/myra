import React from 'react';
import {
  GroupContainer,
  InputGroupContainer,
} from '@coop/cbs/kym-form/ui-containers';
import { FormInput } from '@coop/shared/form';

export const KymCoopDate = () => {
  return (
    <GroupContainer id="Cooperative Date" scrollMarginTop={'200px'}>
      <InputGroupContainer>
        <FormInput type="date" name="lastAuditDate" label="Last Audit Date" />

        <FormInput type="date" name="lastAgmDate" label="Last AGM Date" />
      </InputGroupContainer>
    </GroupContainer>
  );
};
