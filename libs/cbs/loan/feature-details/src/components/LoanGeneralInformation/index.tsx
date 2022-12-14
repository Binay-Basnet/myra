import { DetailCardContent, DetailsCard } from '@myra-ui';

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
        subtitle={loanPreview?.generalInformation?.loanProduct}
      />
      <DetailCardContent
        title="Nature of Loan Product"
        subtitle={loanPreview?.generalInformation?.natureOfLoanProduct?.toLowerCase()}
      />
    </DetailsCard>
  );
};
