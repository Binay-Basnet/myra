import { AiOutlineFileText } from 'react-icons/ai';

import { DetailPageQuickLinks } from '@myra-ui';

import { ROUTES } from '@coop/cbs/utils';
import { amountConverter } from '@coop/shared/utils';

import {
  FeesAndCharges,
  GlTransaction,
  Note,
  OtherDetails,
  PaymentDetails,
  ShareDetails,
  TabHeader,
} from '../components';
import { useShareRegisterDetailHooks } from '../hooks/useShareRegisterDetailHooks';

export const Overview = () => {
  const { shareDetails, shareDetailsData } = useShareRegisterDetailHooks();

  const links = [
    {
      title: 'Share Statement Report',
      link: `${ROUTES.CBS_REPORTS_SHARE_STATEMENT}?memberId=${shareDetails?.member?.id}`,
      icon: AiOutlineFileText,
    },
  ];
  return (
    <>
      <TabHeader heading="Overview" />
      <DetailPageQuickLinks links={links} />
      <ShareDetails shareDetails={shareDetailsData} />
      <FeesAndCharges charges={shareDetails?.charges} />
      <PaymentDetails
        paymentData={shareDetails?.paymentDetail}
        paymentFile={shareDetails?.paymentFile}
      />
      <OtherDetails txnBranch={shareDetails?.transactionBranch} teller={shareDetails?.teller} />
      {shareDetails?.note && <Note note={shareDetails?.note} />}
      <GlTransaction
        data={shareDetails?.glTransactions}
        totalDebit={amountConverter(shareDetails?.totalDebit ?? '0')}
        totalCredit={amountConverter(shareDetails?.totalCredit ?? '0')}
      />
    </>
  );
};
