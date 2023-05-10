import { GeneralInformationPurchaseEntry } from '../components/GeneralInformation';
import { GLTRansactionTable } from '../components/GLTransactionsTable';
import { PurchaseDetailsNotes } from '../components/Notes';
import { PaymentDetailsPurchase } from '../components/PaymentDetails';
import { PurchaseEntries } from '../components/PurchaseEntries';

export const Overview = () => (
  <>
    <GeneralInformationPurchaseEntry />
    <PurchaseEntries />
    <GLTRansactionTable />
    <PaymentDetailsPurchase />
    <PurchaseDetailsNotes />
  </>
);
