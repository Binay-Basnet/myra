import { DetailCardContent, DetailsCard } from '@coop/shared/ui';

import { useLoanDetails } from '../../hooks/useLoanDetails';

export const LoanGeneralInformation = () => {
  const { loan, loanProduct } = useLoanDetails();

  return (
    <DetailsCard title="General Information">
      <DetailCardContent title="Loan Type" subtitle={loan?.productType} />
      <DetailCardContent title="Loan SubType" subtitle={loan?.productSubType} />
      <DetailCardContent title="Loan Product" subtitle={loanProduct?.productName} />
      <DetailCardContent
        title="Nature of Loan Product"
        subtitle={loanProduct?.productNature.toLowerCase()}
      />
    </DetailsCard>
  );
};
