import { DetailCardContent, DetailsCard } from '@coop/shared/ui';
import { useTranslation } from '@coop/shared/utils';

export const LoanRepaymentDetails = () => {
  const { t } = useTranslation();

  return (
    <DetailsCard title={t['transDetailLoanRepaymentDetails']}>
      <DetailCardContent title={t['transDetailLoanRepaymentID']} subtitle="Cash" />
      <DetailCardContent title={t['transDetailChequeNo']} subtitle="Personal Savings" />
      <DetailCardContent title={t['transDetailInstallmentNo']} subtitle="Self" />
      <DetailCardContent title={t['transDetailInstallmentAmount']} subtitle="Self" />
      <DetailCardContent title={t['transDetailTotalRepaymentAmount']} subtitle="Self" />
      <DetailCardContent title={t['transDetailInstallmentDetails']} subtitle="Self" />
      <DetailCardContent title={t['transDetailStatus']} status />
    </DetailsCard>
  );
};
