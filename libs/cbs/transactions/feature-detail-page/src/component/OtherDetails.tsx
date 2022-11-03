import { DetailCardContent, DetailsCard } from '@coop/shared/ui';
import { useTranslation } from '@coop/shared/utils';

import { useTransactionDetailHooks } from '../hooks/useTransactionDetailHooks';

type OtherDetailProps = {
  detailPage: 'deposit' | 'withdraw' | 'accountTransfer';
};

export const OtherDetails = ({ detailPage }: OtherDetailProps) => {
  const { t } = useTranslation();

  const { depositDetailData, withdrawDetailData, accountTransferDetailData } =
    useTransactionDetailHooks();

  return (
    <DetailsCard title={t['transDetailOtherDetails']}>
      {detailPage === 'deposit' && (
        <>
          <DetailCardContent
            title={t['transDetailTransactionBranch']}
            subtitle={depositDetailData?.transactionBranch}
          />
          <DetailCardContent title={t['transDetailTeller']} subtitle={depositDetailData?.teller} />
        </>
      )}

      {detailPage === 'withdraw' && (
        <>
          <DetailCardContent
            title={t['transDetailTransactionBranch']}
            subtitle={withdrawDetailData?.transactionBranch}
          />
          <DetailCardContent title={t['transDetailTeller']} subtitle={withdrawDetailData?.teller} />
        </>
      )}

      {detailPage === 'accountTransfer' && (
        <>
          <DetailCardContent
            title={t['transDetailTransactionBranch']}
            subtitle={accountTransferDetailData?.transactionBranch}
          />
          <DetailCardContent
            title={t['transDetailTeller']}
            subtitle={accountTransferDetailData?.teller}
          />
        </>
      )}
    </DetailsCard>
  );
};
