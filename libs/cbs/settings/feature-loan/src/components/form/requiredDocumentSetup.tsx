// import debounce from 'lodash/debounce';
import { LoanRequiredDocuments } from '@coop/cbs/data-access';
import { FormCheckboxGroup } from '@coop/shared/form';
import { Box, Grid } from '@coop/shared/ui';
import { useTranslation } from '@coop/shared/utils';

import { BoxContainer, TopText } from '../formui';

export const RequiredDocumentSetup = () => {
  const { t } = useTranslation();

  const individualList = [
    {
      label: t['loanProductPolicyDocument'],
      value: LoanRequiredDocuments.PolicyDocument,
    },
    {
      label: t['loanProductLoanChangeDocument'],
      value: LoanRequiredDocuments.LoanChangeDocument,
    },
    { label: t['loanProductForm'], value: LoanRequiredDocuments.Form },
    {
      label: t['loanProductCitizenship'],
      value: LoanRequiredDocuments.Citizenship,
    },
  ];
  return (
    <BoxContainer>
      <TopText> {t['loanProductRequiredDocumentSetup']} </TopText>
      <Grid templateColumns={'repeat(2,1fr)'}>
        <Box display="flex" flexDirection="column" gap="s16" w="40%">
          <FormCheckboxGroup
            name="requiredDocuments"
            list={individualList}
            orientation="column"
          />
        </Box>
      </Grid>
    </BoxContainer>
  );
};
