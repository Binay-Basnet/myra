import { DetailCardContent, DetailsCard } from '@myra-ui';

import { localizedDate } from '@coop/cbs/utils';
import { amountConverter, useTranslation } from '@coop/shared/utils';

import { useTransactionDetailHooks } from '../hooks/useTransactionDetailHooks';

export const LoanRepaymentDetails = () => {
  const { t } = useTranslation();
  const { loanRepaymentDetailData } = useTransactionDetailHooks();

  const totalInterestAmount = loanRepaymentDetailData?.installmentDetails?.reduce(
    (sum, installment) => sum + Number(installment?.interestAmount ?? 0),
    0
  );

  const totalPrincipalAmount = loanRepaymentDetailData?.installmentDetails?.reduce(
    (sum, installment) => sum + Number(installment?.principalAmount ?? 0),
    0
  );

  return (
    <DetailsCard title={t['transDetailLoanRepaymentDetails']} hasThreeRows>
      <DetailCardContent
        title="Transaction ID"
        subtitle={loanRepaymentDetailData?.transactionCode}
      />
      <DetailCardContent
        title={t['transDetailInstallmentNo']}
        subtitle={loanRepaymentDetailData?.installmentNo}
      />
      <DetailCardContent
        title={t['transDetailRepaymentDate']}
        subtitle={localizedDate(loanRepaymentDetailData?.repaymentDate)}
      />
      <DetailCardContent title="Principal" subtitle={amountConverter(totalPrincipalAmount ?? 0)} />
      <DetailCardContent title="Interest" subtitle={amountConverter(totalInterestAmount || 0)} />
      <DetailCardContent
        title="Actual Fine"
        subtitle={amountConverter(
          Number(loanRepaymentDetailData?.fine || 0) +
            Number(loanRepaymentDetailData?.discount || 0)
        )}
      />
      <DetailCardContent
        title="Paid Fine"
        subtitle={amountConverter(loanRepaymentDetailData?.fine ?? 0)}
      />
      <DetailCardContent
        title="Discount Amount"
        subtitle={amountConverter(loanRepaymentDetailData?.discount ?? 0)}
      />
      <DetailCardContent
        title="Rebate"
        subtitle={amountConverter(loanRepaymentDetailData?.rebate || 0)}
      />
      <DetailCardContent
        title={t['transDetailTotalRepaymentAmount']}
        subtitle={amountConverter(loanRepaymentDetailData?.totalRepaymentAmount ?? 0)}
      />
      <DetailCardContent title="Group" subtitle={loanRepaymentDetailData?.groupName} />
      <DetailCardContent title="Center" subtitle={loanRepaymentDetailData?.centerName} />
      <DetailCardContent title={t['transDetailStatus']} status />
    </DetailsCard>
  );
};
