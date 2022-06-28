import React from 'react';

// import debounce from 'lodash/debounce';
import { InputGroupContainer } from '@coop/cbs/kym-form/ui-containers';
import { FormCheckboxGroup, FormInput, FormSwitchTab } from '@coop/shared/form';
import { Box, Grid, Text } from '@coop/shared/ui';

import { BoxContainer, TopText } from '../formui';
const individualList = [
  { label: 'Form ', value: 'form' },
  { label: 'Photo ', value: 'photo' },
  { label: 'Signature', value: 'signature' },
  { label: 'Fingerprint', value: 'fingerprint' },
  { label: 'Nominee Document', value: 'nomineeDocument' },
];

const instutionList = [
  { label: 'Decision', value: 'decision' },
  { label: 'Registered', value: 'registered' },
  { label: 'Signature', value: 'signature' },
  { label: 'Tax Clearance', value: 'taxClearance' },
];
export const RequiredDocumentSetup = () => {
  return (
    <BoxContainer>
      <TopText> Required Document Setup</TopText>
      <Grid templateColumns={'repeat(2,1fr)'}>
        <Box display="flex" flexDirection="column" gap="s16">
          <TopText>Individual</TopText>
          <FormCheckboxGroup
            name="individualRequiredDocuments"
            list={individualList}
            orientation="column"
          />
        </Box>
        <Box display="flex" flexDirection="column" gap="s16">
          <TopText>Institutional</TopText>
          <FormCheckboxGroup
            name="indstitutionalRequiredDocuments"
            list={instutionList}
            orientation="column"
          />
        </Box>
      </Grid>
    </BoxContainer>
  );
};
