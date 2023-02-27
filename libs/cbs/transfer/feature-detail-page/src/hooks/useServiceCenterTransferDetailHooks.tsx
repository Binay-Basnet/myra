import { useRouter } from 'next/router';

import { useGetInterServiceCenterTransferDetailQuery } from '@coop/cbs/data-access';
import { localizedDate } from '@coop/cbs/utils';
import { amountConverter } from '@coop/shared/utils';

export const useServiceCenterTransferDetailHooks = () => {
  const router = useRouter();

  const { id } = router.query;

  const { data } = useGetInterServiceCenterTransferDetailQuery(
    { entryID: id as string },
    {
      enabled: router?.asPath?.includes('service-center-transactions'),
    }
  );

  const serviceCenterTransferDetailData = data?.transaction?.viewServiceCenterCashTransfer?.data;

  const serviceCenterSummary = [
    {
      label: 'Cash Transfer Code',
      value: serviceCenterTransferDetailData?.transactionID,
    },
    {
      label: 'Sender Service Center',
      value: serviceCenterTransferDetailData?.senderServiceCenter,
    },
    {
      label: 'Receiver Service Center',
      value: serviceCenterTransferDetailData?.reveiverServiceCenter,
    },
    {
      label: 'Transfer Date',
      value: localizedDate(serviceCenterTransferDetailData?.transferDate),
    },
    {
      label: 'Cash Amount',
      value: amountConverter(serviceCenterTransferDetailData?.amount as string),
    },
  ];

  const sidebarData = {
    code: serviceCenterTransferDetailData?.transactionID,
    date: localizedDate(serviceCenterTransferDetailData?.transferDate),
    amount: serviceCenterTransferDetailData?.amount,
    srcTellerName: serviceCenterTransferDetailData?.userName,
    srcTellerPic: serviceCenterTransferDetailData?.userProfileUrl,
  };

  return { serviceCenterTransferDetailData, serviceCenterSummary, sidebarData };
};
