import { GeneralInformationSalesNote } from '../components/GeneralInformation';
import { GLTRansactionTable } from '../components/GLTransactionTable';
import { PaymentDetailsSalesNote } from '../components/PaymentDetails';
import { SalesEntries } from '../components/SalesEntries';

export const Overview = () => (
  <>
    <GeneralInformationSalesNote />
    <SalesEntries />
    <GLTRansactionTable />
    <PaymentDetailsSalesNote />
    <GeneralInformationSalesNote />
  </>
);
