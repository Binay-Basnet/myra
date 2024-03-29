import { useMemo, useRef } from 'react';
import { useReactToPrint } from 'react-to-print';
import { useRouter } from 'next/router';

import { Box, DetailPageHeader } from '@myra-ui';

import { localizedDate, localizedText } from '@coop/cbs/utils';

import { TransferVoucherPrint } from '../TransferVoucherPrint';
import { useCashTransitTransferDetailHooks } from '../../hooks';
import { useTransferDetailHooks } from '../../hooks/useTransferDetailHooks';

interface ITransferDetailsHeaderProps {
  title: string;
  page?: string | undefined | null;
}

export const TransferDetailsHeader = ({ title, page }: ITransferDetailsHeaderProps) => {
  const router = useRouter();

  const { transferDetailData, tellerBankTransferData } = useTransferDetailHooks();

  const { cashTransitTransferDetailData } = useCashTransitTransferDetailHooks();

  const printComponentRef = useRef<HTMLInputElement | null>(null);

  const handlePrint = useReactToPrint({
    content: () => printComponentRef.current,
  });

  const pageHeaderOptions =
    transferDetailData?.transferState === 'APPROVED' ||
    cashTransitTransferDetailData?.transitStatus === 'APPROVED'
      ? [{ label: 'Print Voucher', handler: handlePrint }]
      : [];

  const transferDetail = useMemo(() => {
    let tempDetail = {};

    if (router?.asPath?.includes('vault-transfer')) {
      tempDetail = {
        'Transfer ID': `#${transferDetailData?.transferCode}`,
        'Transfer Date': localizedDate(transferDetailData?.date),
        Teller: localizedText(transferDetailData?.srcTeller),
        Type: transferDetailData?.transferType,
      };
    }

    if (router?.asPath?.includes('bank-transfer')) {
      tempDetail = {
        'Transfer ID': `#${tellerBankTransferData?.transactionId}`,
        'Transfer Date': localizedDate(tellerBankTransferData?.transactionDate),
        Teller: tellerBankTransferData?.tellerName,
        Type: tellerBankTransferData?.transferType,
      };
    }

    if (router?.asPath?.includes('teller-transfer')) {
      tempDetail = {
        'Transfer ID': `#${transferDetailData?.transferCode}`,
        'Transfer Date': localizedDate(transferDetailData?.date),
        'Sender Teller': localizedText(transferDetailData?.srcTeller),
        'Receiver Teller': localizedText(transferDetailData?.destTeller),
      };
    }

    if (router?.asPath?.includes('cash-transit-transfer')) {
      tempDetail = {
        'Transfer ID': `#${cashTransitTransferDetailData?.ID}`,
        'Transfer Date': localizedDate(cashTransitTransferDetailData?.date),
        Sender: `${localizedText(cashTransitTransferDetailData?.srcTeller) ?? ''} (${
          cashTransitTransferDetailData?.srcBranch ?? ''
        })`,
        Receiver: `${localizedText(cashTransitTransferDetailData?.destTeller) ?? ''} (${
          cashTransitTransferDetailData?.destBranch ?? ''
        })`,
        'Transfer Mode': cashTransitTransferDetailData?.transferMode,
      };
    }

    return tempDetail;
  }, [transferDetailData, tellerBankTransferData, router?.asPath]);

  return (
    <>
      <Box position="sticky" top="0">
        <DetailPageHeader
          title={title}
          member={{
            name:
              (localizedText(transferDetailData?.srcTeller) as string) ||
              (localizedText(cashTransitTransferDetailData?.srcTeller) as string),
          }}
          options={page ? [{ label: 'Print Voucher', handler: handlePrint }] : pageHeaderOptions}
        />
      </Box>
      <TransferVoucherPrint
        details={transferDetail}
        note={transferDetailData?.note || cashTransitTransferDetailData?.note || ''}
        glTransactions={
          transferDetailData?.glTransaction ||
          tellerBankTransferData?.glTransaction ||
          cashTransitTransferDetailData?.glTransaction
        }
        glTransactionsTotal={
          transferDetailData?.totalDebit ||
          tellerBankTransferData?.totalDebit ||
          cashTransitTransferDetailData?.totalDebit ||
          '0'
        }
        ref={printComponentRef}
      />
    </>
  );
};
