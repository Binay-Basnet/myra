import { DetailCardContent, DetailsCard } from '@myra-ui';

import { localizedDate } from '@coop/cbs/utils';
import { amountConverter, useTranslation } from '@coop/shared/utils';

import { useTransactionDetailHooks } from '../hooks/useTransactionDetailHooks';

export const LoanRepaymentDetails = () => {
  const { t } = useTranslation();
  const { loanRepaymentDetailData } = useTransactionDetailHooks();

  return (
    <DetailsCard title={t['transDetailLoanRepaymentDetails']} hasThreeRows>
      <DetailCardContent
        title="Transaction ID"
        subtitle={loanRepaymentDetailData?.transactionCode}
      />
      <DetailCardContent
        title={t['transDetailRepaymentDate']}
        subtitle={localizedDate(loanRepaymentDetailData?.repaymentDate)}
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
