// import debounce from 'lodash/debounce';
import { FormCheckboxGroup } from '@coop/shared/form';
import { Box, Grid } from '@coop/shared/ui';
import { useTranslation } from '@coop/shared/utils';

import { BoxContainer, TopText } from '../formui';

const instutionList = [
  { label: 'Decision', value: 'decision' },
  { label: 'Registered', value: 'registered' },
  { label: 'Signature', value: 'signature' },
  { label: 'Tax Clearance', value: 'taxClearance' },
];
export const RequiredDocumentSetup = () => {
  const { t } = useTranslation();

  const individualList = [
    { label: t['loanProductPolicyDocument'], value: 'policyDocument' },
    { label: t['loanProductLoanChangeDocument'], value: 'loanChangeDocument' },
    { label: t['loanProductForm'], value: 'form' },
    { label: t['loanProductCitizenship'], value: 'citizenship' },
  ];
  return (
    <BoxContainer>
      <TopText> {t['loanProductRequiredDocumentSetup']} </TopText>
      <Grid templateColumns={'repeat(2,1fr)'}>
        <Box display="flex" flexDirection="column" gap="s16">
          {/* <TopText>Individual</TopText> */}
          <FormCheckboxGroup
            name="individualRequiredDocuments"
            list={individualList}
            orientation="column"
          />
        </Box>
        {/* <Box display="flex" flexDirection="column" gap="s16">
          <TopText>Institutional</TopText>
          <FormCheckboxGroup
            name="indstitutionalRequiredDocuments"
            list={instutionList}
            orientation="column"
          />
        </Box> */}
      </Grid>
    </BoxContainer>
  );
};
