import { LoanRequiredDocuments } from '@coop/cbs/data-access';
import { FormCheckboxGroup } from '@coop/shared/form';
import { FormSection } from '@coop/shared/ui';
import { useTranslation } from '@coop/shared/utils';

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
    <FormSection header="loanProductRequiredDocumentSetup">
      <FormCheckboxGroup
        name="requiredDocuments"
        list={individualList}
        orientation="column"
      />
    </FormSection>
  );
};
