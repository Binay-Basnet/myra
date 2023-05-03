import { AdditionalDDetailsCustomer } from '../components/AdditionalDetails';
import { CustomerAddress } from '../components/CustomerAddress';
import { GeneralInformationCustomer } from '../components/GeneralInformation';

export const Overview = () => (
  <>
    <GeneralInformationCustomer />
    <CustomerAddress />
    <AdditionalDDetailsCustomer />
  </>
);
