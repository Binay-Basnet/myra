import { Box, DetailCardContent, DetailsCard, FileViewer, Text } from '@myra-ui';

import { WithdrawPaymentType } from '@coop/cbs/data-access';
import { localizedDate } from '@coop/cbs/utils';
import { amountConverter, useTranslation } from '@coop/shared/utils';

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
  const depositVoucherUrl = depositDetailData?.paymentFile?.[0] || undefined;

  return (
    <DetailsCard title={t['transDetailPaymentDetails']} hasThreeRows>
      {detailPage === 'deposit' && (
        <>
          <DetailCardContent
            title={t['transDetailPaymentMode']}
            subtitle={depositDetailData?.paymentMode?.replace(/_/g, ' ')}
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
          {depositDetailData?.paymentMode === 'BANK_VOUCHER' &&
            depositDetailData?.depositedDate && (
              <DetailCardContent
                title="Deposited Date"
                subtitle={localizedDate(depositDetailData?.depositedDate)}
              />
            )}
          {depositDetailData?.paymentMode === 'BANK_VOUCHER' && depositDetailData?.paymentFile && (
            <Box display="flex" flexDirection="column" gap="s4">
              <Text fontWeight="500" fontSize="s3" color="gray.700">
                File Upload
              </Text>
              <FileViewer
                fileName={depositVoucherUrl}
                fileUrl={depositVoucherUrl}
                type="Bank Voucher"
              />
            </Box>
          )}
        </>
      )}

      {detailPage === 'withdraw' && withdrawDetailData?.paymentMode === WithdrawPaymentType?.Cash && (
        <>
          <DetailCardContent
            title={t['transDetailPaymentMode']}
            subtitle={withdrawDetailData?.paymentMode?.replace(/_/g, ' ')}
          />
          <DetailCardContent
            title={t['transDetailAmount']}
            subtitle={amountConverter(withdrawDetailData?.withdrawAmount ?? 0)}
          />
          <DetailCardContent
            title={t['transDetailWithdrawnBy']}
            subtitle={withdrawDetailData?.withdrawnBy?.replace(/_/g, ' ')}
          />
        </>
      )}

      {detailPage === 'withdraw' &&
        withdrawDetailData?.paymentMode === WithdrawPaymentType?.BankCheque && (
          <>
            <DetailCardContent
              title={t['transDetailPaymentMode']}
              subtitle={withdrawDetailData?.paymentMode?.replace(/_/g, ' ')}
            />
            <DetailCardContent title="Withdraw Slip No" subtitle={withdrawDetailData?.chequeNo} />
            <DetailCardContent
              title={t['transDetailAmount']}
              subtitle={amountConverter(withdrawDetailData?.withdrawAmount ?? 0)}
            />
            <DetailCardContent
              title={t['transDetailWithdrawnBy']}
              subtitle={withdrawDetailData?.withdrawnBy?.replace(/_/g, ' ')}
            />
          </>
        )}

      {detailPage === 'loanRepayment' && (
        <>
          <DetailCardContent
            title={t['transDetailPaymentMode']}
            subtitle={loanRepaymentDetailData?.paymentMode?.replace(/_/g, ' ')}
          />
          <DetailCardContent
            title={t['transDetailAmount']}
            subtitle={amountConverter(loanRepaymentDetailData?.totalRepaymentAmount ?? 0)}
          />
        </>
      )}
    </DetailsCard>
  );
};
