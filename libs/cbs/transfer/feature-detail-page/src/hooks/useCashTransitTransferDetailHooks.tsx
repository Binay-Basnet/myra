import { useRouter } from 'next/router';

import { useGetCashInTransitDetailQuery } from '@coop/cbs/data-access';
import { amountConverter } from '@coop/shared/utils';

export const useCashTransitTransferDetailHooks = () => {
  const router = useRouter();

  const { id } = router.query;

  const { data } = useGetCashInTransitDetailQuery({ transitID: id as string });

  const cashTransitTransferDetailData = data?.transaction?.cashInTransitDetail?.data;

  const cashTransitSummary = [
    {
      label: 'Transit Code',
      value: cashTransitTransferDetailData?.ID,
    },
    {
      label: 'Sender Service Center',
      value: cashTransitTransferDetailData?.srcBranch,
    },
    {
      label: 'Receiver Service Center',
      value: cashTransitTransferDetailData?.destBranch,
    },
    {
      label: 'Sender Service Center Teller',
      value: cashTransitTransferDetailData?.srcTeller?.local,
    },
    {
      label: 'Transfer Mode',
      value: cashTransitTransferDetailData?.transferMode?.replace(/_/g, ' '),
    },
    {
      label: 'Collector Name',
      value: cashTransitTransferDetailData?.collectorName,
    },
    {
      label: 'Cash Amount',
      value: amountConverter(cashTransitTransferDetailData?.amount as string),
    },
  ];

  const sidebarData = {
    code: cashTransitTransferDetailData?.ID,
    date: cashTransitTransferDetailData?.date?.local,
    amount: cashTransitTransferDetailData?.amount,
    srcTellerName: cashTransitTransferDetailData?.srcTeller?.local,
    srcTellerPic: cashTransitTransferDetailData?.srcProfilePicUrl,
  };

  return { cashTransitTransferDetailData, cashTransitSummary, sidebarData };
};
