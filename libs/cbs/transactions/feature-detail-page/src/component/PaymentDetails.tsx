import { WithdrawPaymentType } from '@coop/cbs/data-access';
import { DetailCardContent, DetailsCard } from '@coop/shared/ui';
import { useTranslation } from '@coop/shared/utils';

import { useTransactionDetailHooks } from '../hooks/useTransactionDetailHooks';

type PaymentDetailProps = {
  detailPage: 'deposit' | 'withdraw' | 'accountTransfer' | 'agentTransaction' | 'loanRepayment';
};

const agentSlug = {
  AGENT: 'Market Representative',
};

export const PaymentDetails = ({ detailPage }: PaymentDetailProps) => {
  const { t } = useTranslation();

  const { depositDetailData, withdrawDetailData, loanRepaymentDetailData } =
    useTransactionDetailHooks();

  return (
    <DetailsCard title={t['transDetailPaymentDetails']}>
      {detailPage === 'deposit' && (
        <>
          <DetailCardContent
            title={t['transDetailPaymentMode']}
            subtitle={depositDetailData?.paymentMode}
          />
          <DetailCardContent
            title={t['transDetailSourcefund']}
            subtitle={depositDetailData?.sourceOfFund}
          />
          <DetailCardContent
            title={t['transDetailDepositedBy']}
            subtitle={
              depositDetailData?.depositedBy === 'AGENT'
                ? agentSlug[depositDetailData?.depositedBy]
                : depositDetailData?.depositedBy
            }
          />
        </>
      )}

      {detailPage === 'withdraw' && withdrawDetailData?.paymentMode === WithdrawPaymentType?.Cash && (
        <>
          <DetailCardContent
            title={t['transDetailPaymentMode']}
            subtitle={withdrawDetailData?.paymentMode}
          />
          <DetailCardContent
            title={t['transDetailAmount']}
            subtitle={withdrawDetailData?.withdrawAmount}
          />
          <DetailCardContent
            title={t['transDetailWithdrawnBy']}
            subtitle={withdrawDetailData?.withdrawnBy}
          />
        </>
      )}

      {detailPage === 'withdraw' &&
        withdrawDetailData?.paymentMode === WithdrawPaymentType?.BankCheque && (
          <>
            <DetailCardContent
              title={t['transDetailPaymentMode']}
              subtitle={withdrawDetailData?.paymentMode}
            />
            <DetailCardContent
              title={t['transDetailChequeNo']}
              subtitle={withdrawDetailData?.chequeNo}
            />
            <DetailCardContent
              title={t['transDetailAmount']}
              subtitle={withdrawDetailData?.withdrawAmount}
            />
            <DetailCardContent
              title={t['transDetailWithdrawnBy']}
              subtitle={withdrawDetailData?.withdrawnBy}
            />
          </>
        )}

      {detailPage === 'loanRepayment' && (
        <>
          <DetailCardContent
            title={t['transDetailPaymentMode']}
            subtitle={loanRepaymentDetailData?.paymentMode}
          />
          <DetailCardContent
            title={t['transDetailAmount']}
            subtitle={loanRepaymentDetailData?.totalRepaymentAmount}
          />
        </>
      )}
    </DetailsCard>
  );
};
