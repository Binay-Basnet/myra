import { DetailCardContent, DetailsCard } from '@myra-ui';

import { RedirectButton, ROUTES } from '@coop/cbs/utils';

import { useLoanDetails } from '../../hooks/useLoanDetails';

export const LoanGeneralInformation = () => {
  const { loanPreview } = useLoanDetails();

  return (
    <DetailsCard title="General Information" hasThreeRows>
      <DetailCardContent title="Loan Type" subtitle={loanPreview?.generalInformation?.loanType} />
      <DetailCardContent
        title="Loan SubType"
        subtitle={loanPreview?.generalInformation?.loanSubType}
      />
      <DetailCardContent
        title="Loan Product"
        children={
          <RedirectButton
            link={`${ROUTES.SETTINGS_GENERAL_LP_DETAILS}?id=${loanPreview?.productId}`}
            label={loanPreview?.generalInformation?.loanProduct as string}
          />
        }
      />
      <DetailCardContent
        title="Nature of Loan Product"
        subtitle={loanPreview?.generalInformation?.natureOfLoanProduct?.toLowerCase()}
      />
    </DetailsCard>
  );
};
