import { ObjState, TransferType } from '@coop/cbs/data-access';
import { DetailCardContent, DetailsCard } from '@coop/shared/ui';
import { useTranslation } from '@coop/shared/utils';

import { useTransactionDetailHooks } from '../hooks/useTransactionDetailHooks';

type TransactionDetailProps = {
  detailPage: 'deposit' | 'withdraw' | 'accountTransfer' | 'agentTransaction';
};

export const TransactionDetails = ({ detailPage }: TransactionDetailProps) => {
  const { t } = useTranslation();

  const {
    depositDetailData,
    withdrawDetailData,
    accountTransferDetailData,
    agentTransactionDetailData,
  } = useTransactionDetailHooks();

  return (
    <DetailsCard title={t['transDetailTransactionDetails']}>
      {detailPage === 'deposit' && (
        <>
          <DetailCardContent
            title={t['transDetailTransactionID']}
            subtitle={depositDetailData?.id}
          />
          <DetailCardContent
            title={t['transDetailTransactionDate']}
            subtitle={depositDetailData?.transactionDate}
          />
          <DetailCardContent
            title={t['transDetailAccount']}
            subtitle={depositDetailData?.accountName}
          />
          <DetailCardContent
            title={t['transDetailVoucherID']}
            subtitle={depositDetailData?.voucherId}
          />
          <DetailCardContent
            title={t['transDetailAmountDeposited']}
            subtitle={depositDetailData?.amount}
          />
          <DetailCardContent title={t['transDetailFine']} subtitle={depositDetailData?.fine} />
          <DetailCardContent title={t['transDetailRebate']} subtitle={depositDetailData?.rebate} />
          <DetailCardContent
            title={t['transDetailTotalDepositAmount']}
            subtitle={depositDetailData?.totalDepositedAmount}
          />
          {depositDetailData?.status === ObjState?.Active && (
            <DetailCardContent title={t['transDetailStatus']} status />
          )}
        </>
      )}
      {detailPage === 'withdraw' && (
        <>
          <DetailCardContent
            title={t['transDetailTransactionID']}
            subtitle={withdrawDetailData?.id}
          />
          <DetailCardContent
            title={t['transDetailTransactionDate']}
            subtitle={withdrawDetailData?.transactionDate}
          />
          <DetailCardContent
            title={t['transDetailAccount']}
            subtitle={withdrawDetailData?.accountName}
          />
          <DetailCardContent
            title={t['transDetailWithdrawBy']}
            subtitle={withdrawDetailData?.withdrawWith}
          />
          <DetailCardContent
            title={t['transDetailChequeNo']}
            subtitle={withdrawDetailData?.chequeNo}
          />
          <DetailCardContent
            title={t['transDetailWithdrawAmount']}
            subtitle={withdrawDetailData?.withdrawAmount}
          />
          <DetailCardContent title={t['transDetailFine']} subtitle={withdrawDetailData?.fine} />
          <DetailCardContent
            title={t['transDetailTotalWithdrawAmount']}
            subtitle={withdrawDetailData?.totalWithdrawnAmount}
          />
          {withdrawDetailData?.status === ObjState?.Active && (
            <DetailCardContent title={t['transDetailStatus']} status />
          )}
        </>
      )}

      {detailPage === 'accountTransfer' && (
        <>
          <DetailCardContent
            title={t['transDetailTransactionID']}
            subtitle={accountTransferDetailData?.id}
          />
          <DetailCardContent
            title={t['transDetailTransactionDate']}
            subtitle={accountTransferDetailData?.transactionDate}
          />
          <DetailCardContent
            title={t['transDetailSourceAccount']}
            subtitle={accountTransferDetailData?.sourceAccount?.accountName}
          />
          <DetailCardContent
            title={t['transDetailTransferType']}
            subtitle={
              accountTransferDetailData?.transferType === TransferType.Member
                ? t['transDetailMembertoMember']
                : t['transDetailSelf']
            }
          />
          <DetailCardContent
            title={t['transDetailReceipentMember']}
            subtitle={accountTransferDetailData?.recipientMember?.name?.local}
          />
          <DetailCardContent
            title={t['transDetailReceipentAccount']}
            subtitle={accountTransferDetailData?.destinationAccount?.id}
          />
          <DetailCardContent
            title={t['transDetailWithdrawBy']}
            subtitle={accountTransferDetailData?.withdrawnBy}
          />
          <DetailCardContent
            title={t['transDetailWithdrawSlipNo']}
            subtitle={accountTransferDetailData?.withdrawnSlipNo}
          />
          <DetailCardContent
            title={t['transDetailTransferAmount']}
            subtitle={accountTransferDetailData?.transferAmount}
          />
          {accountTransferDetailData?.objState === ObjState?.Active && (
            <DetailCardContent title={t['transDetailStatus']} status />
          )}
        </>
      )}
      {detailPage === 'agentTransaction' && (
        <>
          <DetailCardContent
            title={t['transDetailTransactionID']}
            subtitle={agentTransactionDetailData?.transactionId}
          />
          <DetailCardContent
            title={t['transDetailTransactionDate']}
            subtitle={agentTransactionDetailData?.transactionDate}
          />
          <DetailCardContent title={t['transDetailStatus']} status />
        </>
      )}
    </DetailsCard>
  );
};
