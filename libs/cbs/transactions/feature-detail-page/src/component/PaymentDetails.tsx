import { DepositPaymentType } from '@coop/cbs/data-access';
import { DetailCardContent, DetailsCard } from '@coop/shared/ui';
import { useTranslation } from '@coop/shared/utils';

import { useTransactionDetailHooks } from '../hooks/useTransactionDetailHooks';

type PaymentDetailProps = {
  detailPage: 'deposit' | 'withdraw' | 'accountTransfer';
};

export const PaymentDetails = ({ detailPage }: PaymentDetailProps) => {
  const { t } = useTranslation();

  const { depositDetailData, withdrawDetailData } = useTransactionDetailHooks();

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
            subtitle={depositDetailData?.depositedBy}
          />
        </>
      )}

      {detailPage === 'withdraw' && withdrawDetailData?.paymentMode === DepositPaymentType?.Cash && (
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

      {detailPage === 'withdraw' && withdrawDetailData?.paymentMode === DepositPaymentType?.Cheque && (
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
    </DetailsCard>
  );
};
