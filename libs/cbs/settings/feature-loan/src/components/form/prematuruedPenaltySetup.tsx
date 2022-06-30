import React from 'react';

// import debounce from 'lodash/debounce';
import { InputGroupContainer } from '@coop/cbs/kym-form/ui-containers';
import { FormInput, FormSelect } from '@coop/shared/form';
import { Box, Text } from '@coop/shared/ui';

import { BoxContainer, TextBoxContainer, TopText } from '../formui';

export const PrematuredPenalty = () => {
  return (
    <BoxContainer>
      <TextBoxContainer>
        <TopText>Prematured Penalty Setup</TopText>
      </TextBoxContainer>
      <InputGroupContainer>
        <FormInput
          name="efffectiveDaysFromStart"
          label="Effective Days from Start"
          placeholder="Effective Days from Start"
        />
        <FormInput
          name="remainingDaystoMatured"
          label="Remaining Days To get matured"
          placeholder="Remaining Days To get matured"
        />
        <FormInput
          name="penaltyRupees"
          type={'number'}
          label="Penalty Rs"
          textAlign={'right'}
          placeholder="0.0"
        />
        <FormInput
          name="penaltyRate"
          label="Penalty Rate"
          placeholder="0.00"
          rightElement="%"
          textAlign={'right'}
        />
        <FormSelect
          name="penaltyLedgerMapping"
          label="Penalty Ledger Mapping"
          placeholder="Penalty Ledger Mapping"
        />
        <FormInput
          name="averageBalanceAmount"
          label="Average"
          textAlign={'right'}
          placeholder="0.00"
        />
      </InputGroupContainer>
    </BoxContainer>
  );
};
