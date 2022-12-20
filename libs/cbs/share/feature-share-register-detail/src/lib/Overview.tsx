import {
  FeesAndCharges,
  GlTransaction,
  OtherDetails,
  PaymentDetails,
  ShareDetails,
} from '../components';
import { useShareRegisterDetailHooks } from '../hooks/useShareRegisterDetailHooks';

export const Overview = () => {
  const { shareDetails, shareDetailsData } = useShareRegisterDetailHooks();
  return (
    <>
      <ShareDetails shareDetails={shareDetailsData} />
      <FeesAndCharges charges={shareDetails?.charges} />
      <PaymentDetails paymentData={shareDetails?.paymentDetail} />
      <OtherDetails txnBranch={shareDetails?.transactionBranch} teller={shareDetails?.teller} />
      <GlTransaction
        tableData={shareDetails?.glTransactions}
        totalDebit={shareDetails?.totalDebit ?? '0'}
        totalCredit={shareDetails?.totalCredit ?? '0'}
      />
    </>
  );
};
