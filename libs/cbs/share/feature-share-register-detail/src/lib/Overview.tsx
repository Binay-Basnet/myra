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
  return (
    <>
      <TabHeader heading="Overview" />
      <ShareDetails shareDetails={shareDetailsData} />
      <FeesAndCharges charges={shareDetails?.charges} />
      <PaymentDetails paymentData={shareDetails?.paymentDetail} />
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
