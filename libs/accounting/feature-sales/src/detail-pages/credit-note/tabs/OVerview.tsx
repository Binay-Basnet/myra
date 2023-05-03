import { CreditNoteProductDetails } from '../components/CreditnoteProduct';
import { GeneralInformationCreditNote } from '../components/GeneralInformation';
import { CreditNotesNote } from '../components/Notes';
import { PaymentDetailsCreditNote } from '../components/PaymentDetails';

export const Overview = () => (
  <>
    <GeneralInformationCreditNote />
    <CreditNoteProductDetails />
    <PaymentDetailsCreditNote />
    <CreditNotesNote />
  </>
);
