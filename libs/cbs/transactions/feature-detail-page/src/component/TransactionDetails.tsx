import { DetailCardContent, DetailsCard } from '@myra-ui';

import { ObjState, TransferType } from '@coop/cbs/data-access';
import { amountConverter, useTranslation } from '@coop/shared/utils';

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
    <DetailsCard title={t['transDetailTransactionDetails']} hasThreeRows>
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
            subtitle={amountConverter(depositDetailData?.amount ?? 0)}
          />
          <DetailCardContent
            title={t['transDetailFine']}
            subtitle={amountConverter(depositDetailData?.fine ?? 0)}
          />
          <DetailCardContent
            title={t['transDetailRebate']}
            subtitle={amountConverter(depositDetailData?.rebate ?? 0)}
          />
          <DetailCardContent
            title={t['transDetailTotalDepositAmount']}
            subtitle={amountConverter(depositDetailData?.totalDepositedAmount ?? 0)}
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
            subtitle={withdrawDetailData?.withdrawWith?.replace('_', ' ')}
          />
          <DetailCardContent
            title={t['transDetailChequeNo']}
            subtitle={withdrawDetailData?.chequeNo}
          />
          <DetailCardContent
            title={t['transDetailWithdrawAmount']}
            subtitle={amountConverter(withdrawDetailData?.withdrawAmount ?? 0)}
          />
          <DetailCardContent
            title={t['transDetailFine']}
            subtitle={amountConverter(withdrawDetailData?.fine ?? 0)}
          />
          <DetailCardContent
            title={t['transDetailTotalWithdrawAmount']}
            subtitle={amountConverter(withdrawDetailData?.totalWithdrawnAmount ?? 0)}
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
            subtitle={amountConverter(accountTransferDetailData?.transferAmount ?? 0)}
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
