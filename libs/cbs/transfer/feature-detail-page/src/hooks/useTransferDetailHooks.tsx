import { useRouter } from 'next/router';

import { useGetTransferDetailQuery } from '@coop/cbs/data-access';
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

  return { transferDetailData, vaultTxnSummary, tellerTxnSummary, sidebarData };
};
