import { useRouter } from 'next/router';

import { useGetTellerBankDetailsQuery, useGetTransferDetailQuery } from '@coop/cbs/data-access';
import { localizedDate } from '@coop/cbs/utils';
import { amountConverter } from '@coop/shared/utils';

export const useTransferDetailHooks = () => {
  const router = useRouter();

  const { id } = router.query;

  const { data } = useGetTransferDetailQuery(
    { transferID: id as string },
    {
      enabled: !router?.asPath?.includes('cash-transit-transfer'),
    }
  );

  const transferDetailData = data?.transaction?.transferDetail?.data;

  const vaultTxnSummary = [
    {
      label: 'Vault Transfer Code',
      value: transferDetailData?.transferCode,
    },
    {
      label: 'Transfer Type',
      value: transferDetailData?.transferType?.replace(/_/g, ' '),
    },
    {
      label: 'Transfer Date',
      value: transferDetailData?.date?.local,
    },
    {
      label: 'Teller',
      value: transferDetailData?.srcTeller?.local,
    },
    {
      label: 'Cash Amount',
      value: amountConverter(transferDetailData?.amount as string),
    },
  ];

  const tellerTxnSummary = [
    {
      label: 'Teller Transfer Code',
      value: transferDetailData?.transferCode,
    },
    {
      label: 'Sender Teller',
      value: transferDetailData?.srcTeller?.local,
    },
    {
      label: 'Receiver Teller',
      value: transferDetailData?.destTeller?.local,
    },
    {
      label: 'Transfer Date',
      value: transferDetailData?.date?.local,
    },
    {
      label: 'Cash Amount',
      value: amountConverter(transferDetailData?.amount as string),
    },
  ];

  const sidebarData = {
    code: transferDetailData?.transferCode,
    date: transferDetailData?.date?.local,
    transferType: transferDetailData?.transferType,
    amount: transferDetailData?.amount,
    srcTellerName: transferDetailData?.srcTeller?.local,
    srcTellerPic: transferDetailData?.srcProfilePicUrl,
  };

  const { data: tellerBankTransfer } = useGetTellerBankDetailsQuery(
    { transactionId: id as string },
    {
      enabled: router?.asPath?.includes('bank-transfer'),
    }
  );

  const tellerBankTransferData =
    tellerBankTransfer?.transaction?.tellerBankTransfer?.viewDetail?.data;

  const tellerBankSidebarData = {
    code: tellerBankTransferData?.transactionId,
    transferType: tellerBankTransferData?.transferType,
    date: localizedDate(tellerBankTransferData?.transactionDate),
    amount: tellerBankTransferData?.amount,
    srcTellerName: tellerBankTransferData?.tellerName,
    srcTellerPic: tellerBankTransferData?.profilePic,
  };

  const tellerBankTxnSummary = [
    {
      label: 'Teller Bank Transfer Code',
      value: tellerBankTransferData?.transactionId,
    },
    {
      label: 'Transfer Type',
      value: tellerBankTransferData?.bankTransferType?.replace(/_/g, ' '),
    },
    {
      label: 'Transfer Date',
      value: localizedDate(tellerBankTransferData?.transactionDate),
    },
    {
      label: 'Teller',
      value: tellerBankTransferData?.tellerName,
    },
    {
      label: 'Cash Amount',
      value: amountConverter(tellerBankTransferData?.amount as string),
    },
  ];

  return {
    transferDetailData,
    vaultTxnSummary,
    tellerTxnSummary,
    sidebarData,
    tellerBankTransferData,
    tellerBankSidebarData,
    tellerBankTxnSummary,
  };
};
