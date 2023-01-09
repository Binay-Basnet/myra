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
      <Note note={shareDetails?.note} />
      <GlTransaction
        tableData={shareDetails?.glTransactions}
        totalDebit={shareDetails?.totalDebit ?? '0'}
        totalCredit={shareDetails?.totalCredit ?? '0'}
      />
    </>
  );
};
