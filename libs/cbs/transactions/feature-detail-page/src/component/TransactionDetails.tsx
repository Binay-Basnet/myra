import { DetailCardContent, DetailsCard } from '@myra-ui';

import { ObjState, TransferType, WithdrawWith } from '@coop/cbs/data-access';
import { localizedDate, RedirectButton, ROUTES } from '@coop/cbs/utils';
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
            subtitle={depositDetailData?.transactionCode}
          />
          <DetailCardContent
            title={t['transDetailTransactionDate']}
            subtitle={localizedDate(depositDetailData?.transactionDate)}
          />
          <DetailCardContent
            title={t['transDetailAccount']}
            children={
              <RedirectButton
                label={depositDetailData?.accountName}
                link={`${ROUTES.CBS_ACCOUNT_SAVING_DETAILS}?id=${depositDetailData?.accountId}`}
              />
            }
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
            subtitle={withdrawDetailData?.transactionCode}
          />
          <DetailCardContent
            title={t['transDetailTransactionDate']}
            subtitle={localizedDate(withdrawDetailData?.transactionDate)}
          />
          <DetailCardContent
            title={t['transDetailAccount']}
            children={
              <RedirectButton
                label={withdrawDetailData?.accountName}
                link={`${ROUTES.CBS_ACCOUNT_SAVING_DETAILS}?id=${withdrawDetailData?.accountId}`}
              />
            }
          />
          <DetailCardContent
            title={t['transDetailWithdrawBy']}
            subtitle={withdrawDetailData?.withdrawWith?.replace(/_/g, ' ')}
          />
          <DetailCardContent
            title={
              withdrawDetailData?.withdrawWith === WithdrawWith.WithdrawSlip
                ? 'Withdraw Slip No.'
                : 'Counter Slip No.'
            }
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
            subtitle={accountTransferDetailData?.transactionCode}
          />
          <DetailCardContent
            title={t['transDetailTransactionDate']}
            subtitle={localizedDate(accountTransferDetailData?.transactionDate)}
          />
          <DetailCardContent
            title={t['transDetailSourceAccount']}
            children={
              <RedirectButton
                link={`${ROUTES.CBS_ACCOUNT_SAVING_DETAILS}?id=${accountTransferDetailData?.sourceAccount?.id}`}
                label={accountTransferDetailData?.sourceAccount?.accountName as string}
              />
            }
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
            children={
              <RedirectButton
                link={`${ROUTES.CBS_ACCOUNT_SAVING_DETAILS}?id=${accountTransferDetailData?.destinationAccount?.id}`}
                label={accountTransferDetailData?.destinationAccount?.accountName as string}
              />
            }
          />
          <DetailCardContent
            title={t['transDetailWithdrawBy']}
            subtitle={accountTransferDetailData?.withdrawnBy?.replace(/_/g, ' ')}
          />
          <DetailCardContent
            title={t['transDetailWithdrawSlipNo']}
            subtitle={String(accountTransferDetailData?.withdrawnSlipNo)?.padStart(10, '0')}
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
            subtitle={localizedDate(agentTransactionDetailData?.transactionDate)}
          />
          <DetailCardContent title={t['transDetailStatus']} status />
        </>
      )}
    </DetailsCard>
  );
};
