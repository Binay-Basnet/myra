import { useRouter } from 'next/router';

import { useGetCashInTransitDetailQuery } from '@coop/cbs/data-access';
import { amountConverter } from '@coop/shared/utils';

export const useServiceCenterTransferDetailHooks = () => {
  const router = useRouter();

  const { id } = router.query;

  const { data } = useGetCashInTransitDetailQuery(
    { transitID: id as string },
    {
      enabled: router?.asPath?.includes('cash-transit-transfer'),
    }
  );

  const serviceCenterTransferDetailData = data?.transaction?.cashInTransitDetail?.data;

  const serviceCenterSummary = [
    {
      label: 'Cash Transfer Code',
      value: serviceCenterTransferDetailData?.ID,
    },
    {
      label: 'Sender Service Center',
      value: serviceCenterTransferDetailData?.srcBranch,
    },
    {
      label: 'Receiver Service Center',
      value: serviceCenterTransferDetailData?.destBranch,
    },
    {
      label: 'Sender Service Center Teller',
      value: serviceCenterTransferDetailData?.srcTeller?.local,
    },
    {
      label: 'Transfer Date',
      value: serviceCenterTransferDetailData?.transferMode?.replace(/_/g, ' '),
    },
    {
      label: 'Cash Amount',
      value: amountConverter(serviceCenterTransferDetailData?.amount as string),
    },
  ];

  const sidebarData = {
    code: serviceCenterTransferDetailData?.ID,
    date: serviceCenterTransferDetailData?.date?.local,
    amount: serviceCenterTransferDetailData?.amount,
    srcTellerName: serviceCenterTransferDetailData?.srcTeller?.local,
    srcTellerPic: serviceCenterTransferDetailData?.srcProfilePicUrl,
  };

  return { serviceCenterTransferDetailData, serviceCenterSummary, sidebarData };
};
