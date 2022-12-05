import { DetailCardContent, DetailsCard } from '@myra-ui';

import { amountConverter, useTranslation } from '@coop/shared/utils';

import { useTransactionDetailHooks } from '../hooks/useTransactionDetailHooks';

export const LoanRepaymentDetails = () => {
  const { t } = useTranslation();
  const { loanRepaymentDetailData } = useTransactionDetailHooks();

  return (
    <DetailsCard title={t['transDetailLoanRepaymentDetails']}>
      <DetailCardContent
        title={t['transDetailLoanRepaymentID']}
        subtitle={loanRepaymentDetailData?.repaymentId}
      />
      <DetailCardContent
        title={t['transDetailRepaymentDate']}
        subtitle={loanRepaymentDetailData?.repaymentDate}
      />
      <DetailCardContent
        title={t['transDetailInstallmentNo']}
        subtitle={loanRepaymentDetailData?.installmentNo}
      />
      <DetailCardContent
        title={t['transDetailInstallmentAmount']}
        subtitle={amountConverter(loanRepaymentDetailData?.installmentAmount ?? 0)}
      />
      <DetailCardContent title={t['transDetailFine']} subtitle={loanRepaymentDetailData?.fine} />
      <DetailCardContent
        title={t['transDetailTotalRepaymentAmount']}
        subtitle={amountConverter(loanRepaymentDetailData?.totalRepaymentAmount ?? 0)}
      />
      <DetailCardContent title={t['transDetailStatus']} status />
    </DetailsCard>
  );
};
